import { test, expect } from "@playwright/test";
import { goToRoot } from "./helpers.js";
import { iconClasses } from "../src/components/icons.js";

let navBar;
test.beforeEach(async ({ page, baseURL }) => {
	await goToRoot(page,baseURL);
  navBar = await page.getByTestId('navbar')
});

test('has light and dark mode toggle',async( {page, baseURL }) => {
  console.log(await navBar.innerHTML())
  console.log(iconClasses.dark_mode)
  const toggle = await navBar.locator(`.${iconClasses.dark_mode}`);
  console.log(await toggle.innerHTML())
  expect(toggle).toBeVisible();
  await toggle.click()
  expect(await page.getTestId('navbar').locator(iconClasses.light_mode)).toBeVisible();

})
