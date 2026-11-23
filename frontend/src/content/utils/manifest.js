import { readdir } from "fs/promises";

export async function generateFilePaths(dir){
  const entries = await readdir(dir, { withFileTypes: true }) 
  return entries.map(entry => entry.name )
}

export function generateManifest(){
  
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
