import { test, expect} from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/writing");
});

test("goto blogs displays list of writings", async ( { page }) => {
  await expect(page.getByRole("heading", { name: "Writing"})).toBeVisible();
  await expect(page.locator(".header-paragraph")).toBeVisible();
  await expect(page.locator(".writing-links")).toBeVisible();
  const separators = await page.getByRole("separator").all()
  await expect(separators.length).toBeGreaterThan(1);
});

test("clicking on a blog in list redirects to post page", async ( { page } ) => {
  const firstBlog = page.locator(".blog-links").first();
  await firstBlog.click();
  const url = page.url();
  expect(/blog\/[\w]+-?([\w-]+)?/.test(url)).toBe(true);
})
