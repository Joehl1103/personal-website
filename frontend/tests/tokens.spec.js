import { test, expect } from "@playwright/test";
import { goToRoot } from "./helpers";


test.beforeEach(async ({ page, baseURL }) => {
	await goToRoot(page,baseURL);
})

test("--bg element is not empty", async ({ page, baseURL }) => {
	const wrapper = page.locator('.wrapper'); 
	const bg = await wrapper.evaluate((element) => window.getComputedStyle(element).getPropertyValue('--background'));
	expect(bg.trim()).not.toBe('');
})
