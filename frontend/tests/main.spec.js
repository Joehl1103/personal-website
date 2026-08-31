import { test, expect, beforeEach } from "@playwright/test";

const slices = ["", "projects", "blog"];

test("expect nav and footer to be present on every page", async ({ page }) => {
  for (let i = 0; i < slices.length; i++) {
    await page.goto(`/${slices[i]}`);
    const socialsDiv = await page.getByTestId("socials");
    await expect(socialsDiv).toBeTruthy();
    const nav = await page.getByTestId("navbar");
    await expect(nav).toBeTruthy();
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
