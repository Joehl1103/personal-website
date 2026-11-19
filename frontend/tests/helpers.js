import { expect } from "@playwright/test";

export async function goToRoot ( page, baseURL ){
	const res = await page.goto("/");
    const url = res.url();
    const status = res.status();
    const statusText = res.statusText();
    expect(url).toBe(`${baseURL}/`);
    expect(status).toBe(200);
    expect(statusText).toBe("OK");
}
