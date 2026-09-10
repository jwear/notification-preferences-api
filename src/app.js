import express from "express";

const app = express();
const PORT = 3000;

const preferences = [];
let nextId = 1;

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
  res.json(preferences);
});

app.get("/preferences/:id", (req, res) => {
  const id = req.params.id;

  const preference = preferences.find((p) => p.id === Number(id));

  if (!preference) {
    return res.status(404).json({ error: "Notification preference not found" });
  }

  res.json(preference);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
