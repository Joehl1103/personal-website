import { readdir } from "fs/promises";
import path from "node:path";
import {parseFrontMatter} from "../utils/markdown";

export async function generateFilePaths(dir){
  const entries = await readdir(dir, { withFileTypes: true }) 
  return entries.map(entry => entry.name )
}

export async function generateManifest(dir){
  const entries = await generateFilePaths(dir);
  const metas = []
  for (const e of entries){
    const raw = await import(`${path.join(dir,e)}?raw`); 
    const {meta } = parseFrontMatter(raw.default);
    metas.push(meta)
  }
  return metas
}

// export default [
//   {
//     title: "Hello World!",
//     date: "2026-11-21",
//     slug: "hello-world",
//     excerpt: "A short summary used on the list page.",
//     tags: ["vanilla", "blogging"],
//     published: true
//   }
// ]
//
