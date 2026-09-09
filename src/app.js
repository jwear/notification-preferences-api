import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
