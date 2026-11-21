import { test, expect} from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/blog");
});

test("goto blogs displays list of blogs", async ( { page }) => {
  await expect(page.getByRole("heading", { name: "Blog"})).toBeVisible();
  await expect(page.locator(".header-paragraph")).toContainText(/text here about why a blog/)
  await expect(page.getByTestId("hello-world")).toContainText(/Hello World!/);
  //TODO: why is the separator matcher not picking up an array of the separators
  await expect(page.getByRole("separator").all().length).toBeGreaterThan(1);
});
