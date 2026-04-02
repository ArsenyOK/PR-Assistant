import "dotenv/config";
import cors from "cors";
import express from "express";
import { reviewsRouter } from "./routes/reviews.routes";
import { githubWebhookRouter } from "./routes/github-webhook.routes";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(
  cors({
    origin: ["https://pr-assistant-obok.onrender.com", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/reviews", reviewsRouter);
app.use("/webhook/github", githubWebhookRouter);

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "server" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
