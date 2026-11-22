import { test, expect } from "@playwright/test";

test("post display post title, date, content, arrow and view on", async ({ page }) => {
  await page.goto('/blog/hello-world') 
  await expect(page.locator('.back-arrow')).toBeVisible();
  await expect(page.getByRole("heading")).toContainText("Hello World!");
  await expect(page.locator('.post-content')).toBeVisible();
  await expect(page.locator(".date")).toHaveText(/^[\d]{2}\/[\d]{2}\/[\d]{4}$/)
  const separators = await page.getByRole("separator").all();
  expect(separators.length).toBe(2);
  const viewOn = page.locator('.view-on');
  const viewOnLinks = viewOn.getByRole("links").all();
  expect(viewOn.length).toBe(3);
  for (const li of viewOnLinks){
    const text = await li.innerText();
    const href = await li.getAttribute("href");
    if (!href) {
      test.abort(`No link for ${text}`);
    }
    const res = await page.request.get(href);
    expect(res.ok()).toBe(true);
  }
   
})
