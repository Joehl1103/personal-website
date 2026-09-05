import express from "express";
import path from "path";

const app = express();

const __dirname = import.meta.dirname;
const frontend = path.resolve(__dirname);

app.use("/", express.static(frontend));

app.get("{/*path}", (req, res) => {
  console.log(
    "path.resolve(frontend,index.html",
    path.resolve(frontend, "index.html"),
  );
  res.sendFile(path.resolve(frontend, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
