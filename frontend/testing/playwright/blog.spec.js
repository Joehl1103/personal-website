import { test, expect} from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/blog");
});

test("goto blogs displays list of blogs", async ( { page }) => {
  await expect(page.getByRole("heading", { name: "Blog"})).toBeVisible();
  await expect(page.locator(".header-paragraph")).toContainText(/text here about why a blog/)
  await expect(page.getByTestId("hello-world")).toContainText(/Hello World!/);
  const separators = await page.getByRole("separator").all()
  await expect(separators.length).toBeGreaterThan(1);
});

test("clicking on a blog in list redirects to post page", async ( { page } ) => {
  const blogList = page.getByTestId("hello-world");
  await blogList.click();
  const url = page.url();
  expect(url).toContain("/hello-world");
})
