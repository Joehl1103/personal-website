import { test, expect } from "@playwright/test";
import { goToRoot } from "./helpers.js";
import { iconClasses } from "../src/components/icons.js";

let navBar;
test.beforeEach(async ({ page, baseURL }) => {
	await goToRoot(page,baseURL);
  navBar = await page.getByTestId('navbar')
});

test('has light and dark mode toggle',async( {page, baseURL }) => {
  const toggle = await navBar.locator(".mode-toggle");
  await expect(toggle.locator('[data-icon="moon"]')).toBeVisible();
  await toggle.click()
  await expect(page.getByTestId('navbar').locator('[data-icon="sun"]')).toBeVisible();
})

test('toggling mode button toggles model', async ({ page, baseURL }) => {
  await expect(page.locator('.wrapper')).toHaveCSS('background-color','rgb(255, 255, 255)');
  await navBar.locator(".mode-toggle").click();
  await expect(page.locator('.wrapper')).toHaveCSS('background-color','rgb(21, 22, 24)')
})
