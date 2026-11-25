import { test, expect } from "@playwright/test";

test("headshot in dev should load from relative public/ path", async ({ page }) => {
  await page.goto("/");
  const hdsht = await page.locator(".headshot").getAttribute("src");
  expect(hdsht).toContain("assets/hdsht");
});
