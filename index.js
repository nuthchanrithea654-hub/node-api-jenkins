const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "API is running ✅" });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from GET API" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});