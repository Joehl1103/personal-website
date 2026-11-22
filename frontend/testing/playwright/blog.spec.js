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

