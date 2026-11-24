import { test, expect } from "@playwright/test";
import manifest from "../../src/content/manifest.json" with { type: 'json' };

test("post display post title, date, content, arrow and view on", async ({ page }) => {
  const firstItem = manifest[0]
  await page.goto(`/blog/${firstItem.slug}`) 
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
    labels.push(text);
  }
  expect(labels).toEqual(["Substack", "Linkedin", "X"]);
   
})

test("post images are files from the built site", async ({ page }) => {
  const firstItem = manifest[0]
  await page.goto(`/blog/${firstItem.slug}`)
  const images = page.locator(".post-content img")
  await expect(images).toHaveCount(3)
  const srcs = await images.evaluateAll((els) => els.map((el) => el.getAttribute("src")))
  for (const src of srcs) {
    expect(src.startsWith("/assets/blog/")).toBe(true)
    const res = await page.request.get(src)
    expect(res.headers()["content-type"]).toContain("image/png")
    const body = await res.body()
    expect(body.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a")
  }
  for (const img of await images.all()) {
    await expect(img).toBeVisible()
    expect(await img.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true)
  }
})
