import { test, expect } from "@playwright/test";
import { goToRoot } from "./helpers";


test.beforeEach(async ({ page, baseURL }) => {
	await goToRoot(page,baseURL);
})

test("--bg element is not empty", async ({ page, baseURL }) => {
	const wrapper = await page.locator('.wrapper'); 
  const bg = await wrapper.evaluate((element) => {
    const styles = window.getComputedStyle(element)
    for (let i = 0;i < styles.length;i++){
      if(styles[i].startsWith('--bg')){
        return styles[i]
      }
    }
  })
	expect(bg.trim()).not.toBe('');
})
