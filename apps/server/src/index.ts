import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "server" });
});

app.post("/webhook/github", (req, res) => {
  const event = req.headers["x-github-event"];

  console.log("Webhook received");
  console.log("Event:", event);

  if (event === "pull_request") {
    const action = req.body.action;
    const prNumber = req.body.pull_request?.number;
    const repository = req.body.repository?.full_name;
    const installationId = req.body.installation?.id;

    console.log("PR Action:", action);
    console.log("repository:", repository);
    console.log("PR Number:", prNumber);
    console.log("Installation ID:", installationId);
  }

  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
