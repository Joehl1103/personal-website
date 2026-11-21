import { test, expect } from "@playwright/test";

let navBar;
test.beforeEach(async ({ page }) => {
	await page.goto("/");
  navBar = await page.getByTestId('navbar')
});

test('has light and dark mode toggle',async( {page }) => {
  const toggle = await navBar.locator(".mode-toggle");
  await expect(toggle.locator('[data-icon="moon"]')).toBeVisible();
  await toggle.click()
  await expect(page.getByTestId('navbar').locator('[data-icon="sun"]')).toBeVisible();
})

test('toggling mode button toggles model', async ({ page }) => {
  await expect(page.locator('.wrapper')).toHaveCSS('background-color','rgb(230, 228, 220)');
  await navBar.locator(".mode-toggle").click();
  await expect(page.locator('.wrapper')).toHaveCSS('background-color','rgb(37, 37, 33)')
})
