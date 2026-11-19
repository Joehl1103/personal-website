import express from "express";
import path from "path";

const app = express();

const __dirname = import.meta.dirname;
const frontend = path.resolve(__dirname);
const dist = path.resolve(frontend, "dist");

// Sets root url
app.use("/", express.static(dist));

app.get("{/*path}", (req, res) => {
	//NOTE: serves dist and fall back to index.html if dist does not exist
  res.sendFile(path.resolve(dist, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
