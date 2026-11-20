import { test, expect } from "@playwright/test";
import { goToRoot } from "./helpers.js";

let navBar;
test.beforeEach(async ({ page, baseURL }) => {
	await goToRoot(page,baseURL);
  navBar = await page.getByTestId('navbar')
});

test('has light and dark mode toggle',async( {page, baseURL }) => {
  const toggle = await navBar.getByRole('button', { name: "Dark mode"});
  expect(toggle).toBeVisible();
  await toggle.click()
  expect(await page.getTestId('navbar').getByRole('button', { name: 'Light mode' })).toBeVisible()

})
