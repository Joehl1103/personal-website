# Joseph Loomis — Personal Website

Joseph Loomis's personal website, with home, projects, and blog pages. Built with vanilla JavaScript, CSS, and Webpack, with client-side routing.

**Live website:** [joseph-loomis.com](https://joseph-loomis.com)

## Local development

Use Node.js 24 (the version used in CI) and npm.

```sh
cd frontend
npm ci
npm run dev
```

Open [localhost:5001](http://localhost:5001). The development server supports hot reload and client-side routes.

## Production build

From `frontend/`:

```sh
npm run build
node server.js
```

Webpack writes the production files to `frontend/dist/`. The Express server serves that directory at [localhost:3000](http://localhost:3000), with a fallback to `index.html` for client-side routes. Set `PORT` to use a different port.

## Checks

Run these commands from `frontend/`:

```sh
npm run lint
npx playwright install
npm run build
npm run test:e2e
```

Playwright runs tests in Chromium, Firefox, and WebKit. Its configuration starts the Express server on port 3001; build the site before running the tests. Use `npm run test:e2e:ui` for the interactive test runner.

## Project structure

```text
frontend/
  src/
    assets/       Images
    components/   Shared UI components
    views/        Home, projects, and blog views
    router.js     Client-side routing
    index.js      Application entry point
    index.css     Site styles
  tests/          Playwright tests
  index.html      HTML template
  server.js       Express server for the production build
  webpack.config.js
.github/workflows/pipeline.yml
```

## Deployment

GitHub Actions runs linting and browser tests for pull requests and pushes to `master`. After checks pass on a push to `master`, it builds the site, backs up the current deployment, and uploads `frontend/dist/` to the production VPS using SSH and rsync.

Deployment uses the repository secrets `VPS_SSH_KEY`, `VPS_KNOWN_HOSTS`, `VPS_HOST`, and `VPS_USER`. Deployment notifications use the `discord-webhook` secret.
