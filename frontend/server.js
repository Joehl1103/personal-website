import express from "express";
import path from "path";
import fs from "fs";

const app = express();

const __dirname = import.meta.dirname;
const frontend = path.resolve(__dirname);
let dirPath;
const distPath = path.resolve(frontend, "dist");
if (fs.existsSync(distPath)){
  dirPath = distPath
  console.log(`dist is present, serving dist directory ${dirPath}`)
} else {
  dirPath = path.resolve(__dirname)
  console.log(`dist is NOT present, serving root directory ${dirPath}`)
}

// Sets root url
app.use("/", express.static(dirPath));

// for any path after root, serves index.html as the entry point
app.get("{/*path}", (_req, res) => {
  const htmlPath = path.resolve(dirPath,"index.html")
  res.sendFile(htmlPath);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
