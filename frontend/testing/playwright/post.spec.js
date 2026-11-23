import { test, expect } from "@playwright/test";

test("post display post title, date, content, arrow and view on", async ({ page }) => {
  await page.goto('/blog/hello-world') 
  await expect(page.locator('.post-back-arrow')).toBeVisible();
  await expect(page.locator(".post-title")).toBeVisible();
  await expect(page.locator('.post-content')).toBeVisible();
  await expect(page.locator(".post-date")).toHaveText(/^[\d]{2}\/[\d]{2}\/[\d]{4}$/)
  const separators = await page.getByRole("separator").all();
  expect(separators.length).toBe(1);
  const viewOn = page.locator('.view-on');
  const viewOnLinks = await viewOn.getByRole("link").all();
  expect(viewOnLinks.length).toBe(3);
  const labels = [];
  for (const li of viewOnLinks){
    const text = (await li.innerText()).trim();
    const href = await li.getAttribute("href");
    expect(href, text).toMatch(/^https:\/\//);
    labels.push(text);
  }
  expect(labels).toEqual(["Substack", "Linkedin", "X"]);
   
})
