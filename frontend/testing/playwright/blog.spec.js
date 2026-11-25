import { test, expect} from "@playwright/test";
import manifest from "../../src/content/manifest.json" with { type: 'json'};

test.beforeEach(async ({ page }) => {
  await page.goto("/blog");
});

test("goto blogs displays list of blogs", async ( { page }) => {
  await expect(page.getByRole("heading", { name: "Blog"})).toBeVisible();
  await expect(page.locator(".header-paragraph")).toBeVisible();
  await expect(page.locator(".blog-links")).toBeVisible();
  const separators = await page.getByRole("separator").all()
  await expect(separators.length).toBeGreaterThan(1);
});

test("clicking on a blog in list redirects to post page", async ( { page } ) => {
  const firstBlog = await page.locator(".blog-list-element").nth(0);
  await firstBlog.click();
  await page.waitForURL(/\/blog\/.+/)
  const url = page.url();
  expect(/blog\/[\w\d]+-?([\w\d-]+)?/.test(url)).toBe(true);
})

test("blog list displays only elements associated with blog posts with no stray characters", async ({ page }) =>{
  const elements = page.locator(".blog-links");
  expect(elements.locator("blog-list-element")).toHaveCount(manifest.length)
  const strayText = await elements.evaluate((el) => {
    return [...el.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent.trim())
      .filter(Boolean)
  })
  expect(strayText).toEqual([]);
})

