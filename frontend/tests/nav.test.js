import { test, expect } from "@playwright/test";
import { goToRoot } from "./helpers.js";

let navBar;
test.beforeEach(async ({ page, baseURL }) => {
	await goToRoot(page,baseURL);
  navBar = await page.getByTestId('navbar')
});

test('has light and dark mode toggle',async( {page, baseURL }) => {
  const toggle = await navBar.locator('fa-light fa-brightness-low');
  expect(toggle).toBeVisible();
  await toggle.click()
  expect(await page.getTestId('navbar').locator('.fa-solid fa-moon')).toBeVisible();

})
