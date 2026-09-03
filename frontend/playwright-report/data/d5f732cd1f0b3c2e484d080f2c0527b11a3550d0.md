# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: main.spec.js >> expect nav and footer to be present on every page
- Location: tests/main.spec.js:13:6

# Error details

```
Error: page.goto: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.beforeEach(async ({ page, baseURL }) => {
> 4  |   const res = await page.goto("/");
     |                          ^ Error: page.goto: Target page, context or browser has been closed
  5  |   const url = res.url();
  6  |   const status = res.status();
  7  |   const statusText = res.statusText();
  8  |   expect(url).toBe(`${baseURL}/`);
  9  |   expect(status).toBe(200);
  10 |   expect(statusText).toBe("OK");
  11 | });
  12 | 
  13 | test.only("expect nav and footer to be present on every page", async ({
  14 |   page,
  15 | }) => {
  16 |   const pageData = {
  17 |     home: { "nav-link": "home-link", "header-text": "Home" },
  18 |     projects: { "nav-link": "projects-link", "header-text": "Projects" },
  19 |     blog: { "nav-link": "blog-link", "header-text": "Blog" },
  20 |   };
  21 |   for (const [key, value] of Object.entries(pageData)) {
  22 |     const { "nav-link": navLink, "header-text": headerText } = value;
  23 |     await page.getByTestId(navLink).click();
  24 |     const header = page.getByRole("heading", {
  25 |       level: 1,
  26 |       name: headerText,
  27 |     });
  28 |     console.log("header", await header.textContent());
  29 |     // const socialsDiv = await page.getByTestId("socials");
  30 |     // await expect(socialsDiv).toBeTruthy();
  31 |     // const nav = await page.getByTestId("navbar");
  32 |     // await expect(nav).toBeTruthy();
  33 |   }
  34 | });
  35 | 
  36 | test("home page has headshot", async ({ page }) => {
  37 |   await page.goto("/");
  38 |   const headshot = await page.getByAltText("headshot");
  39 |   await expect(headshot).toBeTruthy();
  40 | });
  41 | 
  42 | test("all links on projects 200", async ({ page, baseURL }) => {
  43 |   console.log("baseURL", baseURL);
  44 |   await page.goto("/projects");
  45 |   const mainHeader = await page.getByTestId("main-header");
  46 |   await expect(mainHeader).toHaveText("Projects");
  47 |   const content = page.getByTestId("content");
  48 |   const allLinks = await content.getByRole("link").all();
  49 |   for (const li of allLinks) {
  50 |     const text = await li.innerText();
  51 |     const href = await li.getAttribute("href");
  52 |     if (!href) {
  53 |       console.log(`No link for ${text}`);
  54 |     }
  55 |     const res = await page.request.get(href);
  56 |     expect(res.ok()).toBeTruthy();
  57 |   }
  58 | });
  59 | 
```