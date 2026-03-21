import "dotenv/config";
import express from "express";
import { getInstallationToken } from "./github/installation";
import { buildDiffFromFiles, getPullRequestFiles } from "./github/pulls-files";
import { generateReview } from "./services/pr-review.service";
import { addPullRequestComment } from "./github/comments";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "server" });
});

app.post("/webhook/github", async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const action = req.body.action;
    const prNumber = req.body.pull_request?.number;
    const repository = req.body.repository?.full_name;
    const installationId = req.body.installation?.id;
    const state = req.body.pull_request?.state;

    console.log("Webhook received");
    console.log("Event:", event);
    console.log("Action:", action);
    console.log("State:", state);

    const shouldReview =
      event === "pull_request" &&
      ["opened", "synchronize", "reopened"].includes(action) &&
      state === "open";

    if (shouldReview) {
      const token = await getInstallationToken(installationId);

      const files = await getPullRequestFiles(repository, prNumber, token);

      const diff = buildDiffFromFiles(files);

      const review = await generateReview(diff);

      await addPullRequestComment(repository, prNumber, token, review);
    } else {
      console.log("Skip event");
    }

    res.status(200).send("ok");
  } catch (error) {
    console.error("Webhook processing failed:", error);
    res.status(500).send("Webhook processing failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
