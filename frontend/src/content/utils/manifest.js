import { readdir,readFile } from "node:fs/promises";
import path from "node:path";
import {parseFrontMatter} from "../utils/markdown.js";

export async function generateFilePaths(dir){
  const entries = await readdir(dir, { withFileTypes: true }) 
  return entries.map(entry => entry.name )
}

export async function generateManifest(dir){
  const entries = await generateFilePaths(dir);
  const metas = []
  for (const e of entries){
    const raw = await readFile(`${path.join(dir,e)}`,'utf8'); 
    const { meta } = parseFrontMatter(raw);
    metas.push(meta)
  }
  return metas
}

