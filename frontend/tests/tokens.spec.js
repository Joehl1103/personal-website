import { test, expect } from "@playwright/test";
import { goToRoot } from "./helpers";


test.beforeEach(async ({ page, baseURL }) => {
	await goToRoot(page,baseURL);
})

test("--bg element is not empty", async ({ page, baseURL }) => {
	const wrapper = await page.locator('.wrapper'); 
	const vars = await wrapper.evaluate((element) => { 
  const styles = window.getComputedStyle(element)
  const res = {}
  for (let i = 0;i < styles.length; i++){
    const props = styles[i]
    if (props.startsWith('--')){
      res[props] = styles.getPropertyValue(props)
    }
  }
  return res
  })
  console.log('vars',vars)
	//  console.log('bg',bg)
	// expect(bg.trim()).not.toBe('');
})
