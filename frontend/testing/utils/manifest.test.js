import { test, expect } from "vitest";
import { generateManifest,generateFilePaths } from "../../src/content/utils/manifest.js";
import path from "node:path";


const fixturePath = path.join(import.meta.dirname,"fixtures");
test('generates file paths for all files in directory', async () => {
  const paths = await generateFilePaths(fixturePath)
  for (const p of paths){
    expect(p).toMatch(/([\w]+)-?([\w]+)?.md/)
  }
})

test('generate manifest from .md files on disk', async () => {
  const manifest = await generateManifest(fixturePath);
  expect(manifest.length).toBeGreaterThan(1);
  for (const m of manifest){
    expect(m).toStrictEqual({
      title: expect.any(String),
      date: expect.stringMatching(/^[\d]{2}\/[\d]{2}\/[\d]{4}$/),
      slug: expect.stringMatching(/[\w]+-?([\w-]+)?/),
      x_link: expect.stringMatching(/https?:\/\/[^\s<>"']+/),
      substack_link: expect.stringMatching(/https?:\/\/[^\s<>"']+/),
      linkedin_link: expect.stringMatching(/https?:\/\/[^\s<>"']+/)
    })
  }
})
