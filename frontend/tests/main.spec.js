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

test("expect heading nav and footer to be present on every page", async ({
  page,
  baseURL,
}) => {
  const pageData = {
    home: { "nav-link": "home-link", "header-text": "Home", route: "/" },
    projects: {
      "nav-link": "projects-link",
      "header-text": "Projects",
      route: "/projects",
    },
    blog: { "nav-link": "blog-link", "header-text": "Blog", route: "/blog" },
  };
  console.log("baseURL", baseURL);
  for (const [key, value] of Object.entries(pageData)) {
    const { "nav-link": navLink, "header-text": headerText, route } = value;
    await page.getByTestId(navLink).click();
    const header = page.getByRole("heading", {
      level: 1,
      name: headerText,
    });
    expect(page.url()).toBe(`${baseURL}${route}`);
    expect(await header.textContent()).toBe(headerText);
    const socialsDiv = page.getByTestId("footer-socials");
    await expect(socialsDiv).toBeVisible();
    const nav = page.getByTestId("navbar");
    await expect(nav).toBeVisible();
  }
});

test("home page has headshot", async ({ page }) => {
  const headshot = await page.getByAltText("headshot");
  await expect(headshot).toBeVisible();
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
    expect(res.ok()).toBe(true);
  }
});
