import { test, expect } from "vitest";
import { generateManifest,generateFilePaths } from "../../src/content/utils/manifest.js";
import path from "node:path";

test.only('generates file paths for all files in directory', async () => {
  const fixturePath = path.join(import.meta.dirname,"fixtures");
  const paths = await generateFilePaths(fixturePath)
  console.log('paths',paths)
  for (const p of paths){
    expect(p).toMatch(/([\w]+)-?([\w]+)?.md/)
  }
})

test('generate manifest from .md files on disk', async () => {
  const manifest = generateManifest();
  expect(manifest.length).toBeGreaterThan(1);
  for (const m in manifest){
    expect(m).toStrictEqual({
      title: expect.any(String),
      date: expect.stringMatching(/^[\d]{2}\/[\d]{2}\/[\d]{4}$/),
      slug: expect.stringMatching(/blog\/[\w]+-?([\w-]+)?/),
      x_link: expect.stringMatching(/https?:\/\/[^\s<>"']+/),
      substack_link: expect.stringMatching(/https?:\/\/[^\s<>"']+/),
      linkedin_link: expect.stringMatching(/https?:\/\/[^\s<>"']+/)
    })
  }
})
