import { generateManifest } from "../content/utils/manifest.js";
import { writeFile } from "node:fs/promises";
import path from "node:path";

async function main(){
    const blogDirPath = path.resolve(import.meta.dirname,"..","content","blog");
    const manifest = await generateManifest(blogDirPath);
  console.log('manifest',manifest)
    const outputDir = path.resolve(import.meta.dirname,"..","content");
    await writeFile(path.join(outputDir,"manifest.json"),JSON.stringify(manifest));
}


await main()
