const express = require("express");
const path = require("path");

const app = express();

app.use("/frontend", express.static(path.resolve(__dirname, "frontend")));

app.get("{/*path}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
