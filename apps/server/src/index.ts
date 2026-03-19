import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "server" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
