# Playwright fixtures
Playwright can open HTML that is not the site. Those files live in `frontend/testing/fixtures/` and are served by a process that publishes only that directory. The dev server on port 5001 and the app tests on port 3001 stay as they are.
This file is the spec. It does not add the server, edit `playwright.config.js`, or mark an OmniFocus task complete. `plan.md` is named in `AGENTS.md` and is not in the repo. This file does not add it.
## What this is for
A fixture is a document you want to look at, or assert against, without making it a route, a source module, or a file webpack will delete. A token sheet, a single component in isolation, or a page that must not load `main.js` belongs here.
Behavior the site actually has stays on the built app. `testing/playwright/main.spec.js` and `testing/playwright/nav.test.js` keep calling the app. The `--bg` work in `plans/design-system.md` stays on that app. This spec does not move it and does not change the Part 1 order in `AGENTS.md`.
## Servers that already exist
| Server | Port | What it shows |
| --- | --- | --- |
| `npm run dev` | 5001 | The webpack app. `devServer.static` is the whole `frontend/` directory. The in-memory bundle owns `/`. `historyApiFallback` sends unknown paths to the app shell. |
| `node server.js` | 3000, or `PORT` | `frontend/dist/` when that directory exists. Otherwise the whole `frontend/` directory. `/src/` is always mounted from source. The catch-all `app.get("{/*path}")` sends every other path to `index.html`. |
| Playwright `webServer` | 3001 | The same `server.js`, with `PORT=3001` and `reuseExistingServer: false`. `npm run test:e2e` builds first, so this is the production `dist/`. |
`server.js` has no fixture root. A file under `frontend/`, `src/`, or `dist/` is either reachable while developing or removed on the next build (`output.clean` is true).
## Files to add
```text
frontend/testing/fixtures/          # HTML and CSS to open
frontend/testing/fixture-server.js  # serves that directory and nothing else
frontend/testing/playwright/fixtures/smoke.spec.js
```
`express` is already a dependency. `package.json` is `"type": "module"`. Node 24 already provides `import.meta.dirname`, which `server.js` and `playwright.config.js` use. No new package.
Webpack's entry is `src/index.js`. It does not bundle `testing/`. Vitest already excludes `**/testing/playwright/**`. `fixture-server.js` is not a `*.test.js` or `*.spec.js` file, so Vitest does not collect it.
## Fixture server
The fixture server serves `testing/fixtures/` as static files and answers `GET /ready` with 200. Playwright's `webServer.url` is polled until it returns a 2xx status. `express.static` returns 404 for `/` when the directory has no `index.html`, so the ready check is its own route and does not depend on a fixture page.
```js
import express from "express";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "fixtures");
const port = Number(process.env.PORT) || 3002;
const app = express();
app.get("/ready", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});
app.use(express.static(root));
app.listen(port, "127.0.0.1", () => {
  console.log(`Fixture server listening on ${port}`);
});
```
Bind `127.0.0.1`. The default port is 3002, so a forgotten `PORT` does not land on `server.js`'s default of 3000.
Leave these out of this file:
- A mount of `/src/`. That publish is what `server.js` does, and it is how the built page still loads `/src/index.css`.
- A catch-all that sends `index.html`. Unknown paths stay 404.
- Any import of `src/router.js`, `src/index.js`, or `server.js`.
A fixture document is self-contained. Its stylesheet is a relative link to a file in `testing/fixtures/`. `href="/src/index.css"` and `src="/main.js"` only exist on the app servers. A fixture that needs the live app is the app, opened on port 3001 or 5001.
`npm run dev` does not start this process. Playwright starts it for the test run and stops it afterward.
## Playwright config
`webServer` accepts a list. Each project sets its own `baseURL`. The shared `use.baseURL` stays the app URL, so a new app project still hits port 3001.
Keep Chromium, Firefox, and WebKit. The app projects ignore the fixture directory. The fixture project is Chromium only and matches that directory. `nav.test.js` is named `.test.js`, and Playwright's default `testMatch` collects both `*.test.js` and `*.spec.js`. Ignoring by folder keeps both names on the app.
```js
const appURL = "http://127.0.0.1:3001";
const fixtureURL = "http://127.0.0.1:3002";
export default defineConfig({
  testDir: "./testing/playwright",
  use: {
    baseURL: appURL,
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "PORT=3001 node server.js",
      cwd: import.meta.dirname,
      url: appURL,
      reuseExistingServer: false,
      timeout: 120 * 1000,
      stderr: "pipe",
      stdout: "pipe",
    },
    {
      command: "PORT=3002 node testing/fixture-server.js",
      cwd: import.meta.dirname,
      url: `${fixtureURL}/ready`,
      reuseExistingServer: false,
      timeout: 120 * 1000,
      stderr: "pipe",
      stdout: "pipe",
    },
  ],
  projects: [
    {
      name: "chromium",
      testIgnore: "**/fixtures/**",
      use: { ...devices["Desktop Chrome"], baseURL: appURL },
    },
    {
      name: "firefox",
      testIgnore: "**/fixtures/**",
      use: { ...devices["Desktop Firefox"], baseURL: appURL },
    },
    {
      name: "webkit",
      testIgnore: "**/fixtures/**",
      use: { ...devices["Desktop Safari"], baseURL: appURL },
    },
    {
      name: "fixtures",
      testMatch: "**/fixtures/**",
      use: { ...devices["Desktop Chrome"], baseURL: fixtureURL },
    },
  ],
});
```
`reuseExistingServer: false` keeps Playwright from attaching to a process already listening. Both servers start for a run, including `npx playwright test --project=chromium`. The fixture project still has to set `baseURL`. The shared value is the app, and a fixture spec that forgets the override opens port 3001.
App specs stay where they are. Fixture specs go in `testing/playwright/fixtures/`. A fixture test is `await page.goto("/smoke.html")`, which resolves against port 3002.
Add one script that does not build:
```json
"test:fixtures": "npx playwright test --project=fixtures"
```
`npm run test:e2e` stays `npm run build && npx playwright test`. The app projects still need `dist/`. CI runs that script and needs no workflow edit. Once a fixture spec exists, CI runs it too. `npm run test:e2e:chromium:noreport` stays on `--project=chromium`, so it keeps skipping fixture specs.
A fixture change is visible on the next test run. Webpack does not have to rebuild, because the fixture server reads the files from disk.
## Smoke fixture
`testing/fixtures/smoke.html` is a complete document. It has its own heading and it does not load `main.js`, `router.js`, or `/src/index.css`.
`testing/playwright/fixtures/smoke.spec.js` opens `/smoke.html`, expects that heading, and expects the app shell to be absent (`nav-component` and `#content`). That is the check that the fixture origin is not the site.
`/ready` is the server's health check. It is not a page under test.
## The client router
Fixture pages do not get a second router, and `src/router.js` does not grow a test flag.
`src/router.js` runs only after a document has loaded `main.js`. On `DOMContentLoaded` it matches `location.pathname` to Home, Projects, Blog, or the 404 view, then writes that view into `#content`. `navigateTo` updates the history entry and calls `router()` in memory. A click on `[data-link]` is that call. It is not a document request.
- Port 3001 serves the built app. The document loads `main.js`, so the client router runs.
- Port 3002 serves `testing/fixtures/` as static files. A fixture document does not load `main.js`, so the client router never starts.
`npm run dev` is a third process. Playwright never starts it.
## Intercepting one response
`page.route` belongs in a spec that loads the real app and replaces one response. The rest of the app continues to come from port 3001. The handler exists only in that test. The dev server never sees it.
Register the route before `page.goto`. The pattern is the one fixture URL.
```js
import path from "node:path";
import { test } from "@playwright/test";
test("one fixture response on the app", async ({ page }) => {
  const fixture = path.resolve(
    import.meta.dirname,
