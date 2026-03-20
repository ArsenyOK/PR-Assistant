import express from "express";
import { githubWebhookHandler } from "./routes/github-webhook";

const app = express();

app.use(express.json());

app.post("/webhook/github", githubWebhookHandler);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
