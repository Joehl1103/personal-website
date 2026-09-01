import express from "express";
import path from "path";

const app = express();

const __dirname = import.meta.dirname;

app.use("/frontend", express.static(path.resolve(__dirname, "frontend")));

app.get("{/*path}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
