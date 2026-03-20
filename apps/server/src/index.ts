import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "server" });
});

app.post("/webhook/github", (req, res) => {
  console.log("Webhook received");
  console.log("Event:", req.headers["x-github-event"]);
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
