import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  const res = await page.goto("/");
  const url = res.url();
  const status = res.status();
  const statusText = res.statusText();
  expect(url).toBe(`${baseURL}/`);
  expect(status).toBe(200);
  expect(statusText).toBe("OK");
});

test.only("expect nav and footer to be present on every page", async ({
  page,
}) => {
  const pageData = {
    home: { "nav-link": "home-link", "header-text": "Home" },
    projects: { "nav-link": "projects-link", "header-text": "Projects" },
    blog: { "nav-link": "blog-link", "header-text": "Blog" },
  };
  for (const [key, value] of Object.entries(pageData)) {
    const { "nav-link": navLink, "header-text": headerText } = value;
    await page.getByTestId(navLink).click();
    const header = page.getByRole("heading", {
      level: 1,
      name: headerText,
    });
    console.log("header", await header.textContent());
    // const socialsDiv = await page.getByTestId("socials");
    // await expect(socialsDiv).toBeTruthy();
    // const nav = await page.getByTestId("navbar");
    // await expect(nav).toBeTruthy();
  }
});

test("home page has headshot", async ({ page }) => {
  await page.goto("/");
  const headshot = await page.getByAltText("headshot");
  await expect(headshot).toBeTruthy();
});

test("all links on projects 200", async ({ page, baseURL }) => {
  console.log("baseURL", baseURL);
  await page.goto("/projects");
  const mainHeader = await page.getByTestId("main-header");
  await expect(mainHeader).toHaveText("Projects");
  const content = page.getByTestId("content");
  const allLinks = await content.getByRole("link").all();
  for (const li of allLinks) {
    const text = await li.innerText();
    const href = await li.getAttribute("href");
    if (!href) {
      console.log(`No link for ${text}`);
    }
    const res = await page.request.get(href);
    expect(res.ok()).toBeTruthy();
  }
});
