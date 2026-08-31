# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: main.spec.js >> all links on projects 200
- Location: tests/main.spec.js:21:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('main-header')
Expected: "Projects"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('main-header')

```

```yaml
- text: Cannot GET /projects
```

# Test source

```ts
  1  | import { test, expect, beforeEach } from "@playwright/test";
  2  | 
  3  | const slices = ["", "projects", "blog"];
  4  | 
  5  | test("expect nav and footer to be present on every page", async ({ page }) => {
  6  |   for (let i = 0; i < slices.length; i++) {
  7  |     await page.goto(`/${slices[i]}`);
  8  |     const socialsDiv = await page.getByTestId("socials");
  9  |     await expect(socialsDiv).toBeTruthy();
  10 |     const nav = await page.getByTestId("navbar");
  11 |     await expect(nav).toBeTruthy();
  12 |   }
  13 | });
  14 | 
  15 | test("home page has headshot", async ({ page }) => {
  16 |   await page.goto("/");
  17 |   const headshot = await page.getByAltText("headshot");
  18 |   await expect(headshot).toBeTruthy();
  19 | });
  20 | 
  21 | test("all links on projects 200", async ({ page, baseURL }) => {
  22 |   console.log("baseURL", baseURL);
  23 |   await page.goto("/projects");
  24 |   const mainHeader = await page.getByTestId("main-header");
> 25 |   await expect(mainHeader).toHaveText("Projects");
     |                            ^ Error: expect(locator).toHaveText(expected) failed
  26 |   const content = page.getByTestId("content");
  27 |   const allLinks = await content.getByRole("link").all();
  28 |   for (const li of allLinks) {
  29 |     const text = await li.innerText();
  30 |     const href = await li.getAttribute("href");
  31 |     if (!href) {
  32 |       console.log(`No link for ${text}`);
  33 |     }
  34 |     const res = await page.request.get(href);
  35 |     expect(res.ok()).toBeTruthy();
  36 |   }
  37 | });
  38 | 
```