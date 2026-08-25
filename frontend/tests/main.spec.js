import { test, expect } from "@playwright/test";

const slices = ["", "projects", "blog"];

test("expect nav and footer to be present on every page", async ({ page }) => {
  for (let i = 0; i < slices.length; i++) {
    await page.goto(`/${slices[i]}`);
    const socialsDiv = page.getByTestId("socials");
    expect(socialsDiv).toBeTruthy();
    const nav = page.getByTestId("navbar");
    expect(nav).toBeTruthy();
  }
});

test("home page has headshot", async ({ page }) => {
  await page.goto("/");
  const headshot = page.getByAltText("headshot");
  expect(headshot).toBeTruthy();
});

test.only("all links on projects 200", async ({ page }) => {
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
