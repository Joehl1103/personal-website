import express from "express";
import path from "path";
import fs from "fs";

const app = express();

const __dirname = import.meta.dirname;
const frontend = path.resolve(__dirname);
const distPath = path.resolve(frontend, "dist");
if (!fs.existsSync(distPath)){
  console.error("dist/ is missing. Run `npm run build`, or use `npm run dev` for local development.");
} 
// Sets root url
app.use(express.static(distPath));

// for any path after root, serves index.html as the entry point
app.get("{/*path}", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
