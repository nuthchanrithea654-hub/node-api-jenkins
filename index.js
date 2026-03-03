const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // needed for POST/PUT body

let items = [{ id: 1, name: "apple" }];

// GET
app.get("/api/items", (req, res) => {
  res.json(items);
});

// POST (Task 14 new API)
app.post("/api/items", (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT (Task 14 new API)
app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: "Not found" });

  item.name = req.body.name;
  res.json(item);
});

// DELETE (Task 14 new API)
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  items = items.filter(i => i.id !== id);
  res.json({ message: "Deleted", id });
});

app.get("/", (req, res) => {
  res.send("Node API is running 🚀");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});