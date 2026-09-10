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
      .json({ error: "userId, type, email, sms, and push are required" });
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

app.patch("/preferences/:id", (req, res) => {
  const id = req.params.id;
  const { userId, type, email, sms, push } = req.body;

  const preference = preferences.find((p) => p.id === Number(id));

  if (!preference) {
    return res.status(404).json({ error: "Notification preference not found" });
  }

  if (
    (userId && typeof userId !== "number") ||
    (type && typeof type !== "string") ||
    (email !== undefined && typeof email !== "boolean") ||
    (sms !== undefined && typeof sms !== "boolean") ||
    (push !== undefined && typeof push !== "boolean")
  ) {
    return res.status(400).json({ error: "Invalid field types" });
  }

  if (userId !== undefined) {
    preference.userId = userId;
  }

  if (type !== undefined) {
    preference.type = type;
  }

  if (email !== undefined) {
    preference.email = email;
  }

  if (sms !== undefined) {
    preference.sms = sms;
  }

  if (push !== undefined) {
    preference.push = push;
  }

  res.json(preference);
});

app.delete("/preferences/:id", (req, res) => {
  const id = req.params.id;

  const index = preferences.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: "Notification preference not found" });
  }

  preferences.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
