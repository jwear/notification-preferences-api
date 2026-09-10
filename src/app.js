import express from "express";

const app = express();
const PORT = 3000;

const preferences = [];
let nextId = 0;

app.use(express.json());

app.post("/preferences", (req, res) => {
  const { userId, type, email, sms, push } = req.body;

  if (
    !userId ||
    !type ||
    email === undefined ||
    sms === undefined ||
    push === undefined
  ) {
    return res
      .status(400)
      .json({ error: "userId, type, email, sms, and pus are required" });
  }

  if (
    typeof userId !== "number" ||
    typeof type !== "string" ||
    typeof email !== "boolean" ||
    typeof sms !== "boolean" ||
    typeof push !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid field types" });
  }

  const preference = { id: nextId, userId, type, email, sms, push };
  preferences.push(preference);
  nextId++;

  res.status(201).json(preference);
});

app.get("/preferences", (req, res) => {
  return res.json(preferences);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
