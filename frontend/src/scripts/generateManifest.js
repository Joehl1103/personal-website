import { generateManifest } from "../content/utils/manifest.js";
import { writeFile } from "node:fs/promises";
import path from "node:path";

async function main(){
    const blogDirPath = path.resolve(import.meta.dirname,"..","content","blog","posts");
    const manifest = await generateManifest(blogDirPath);
    const outputDir = path.resolve(import.meta.dirname,"..","content");
    await writeFile(path.join(outputDir,"manifest.json"),JSON.stringify(manifest));
}


await main()
