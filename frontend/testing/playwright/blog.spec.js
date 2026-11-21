import { test, expect} from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/blogs");
});

test("goto blogs displays list of blogs", async ( { page }) => {
  await expect(page.getByRole("header", { name: "Blog"})).toBeVisible();
  await expect(page.getByRole("paragraph")).toContainText("text here about why a blog")
  await expect(page.getByTestId("hello-world")).toHaveText("Hello World!");
  await expect(page.getByRole("separator").all().length).toBeGreaterThan(1);
});
