import "dotenv/config";
import express from "express";
import { getInstallationToken } from "./github/installation";
import { buildDiffFromFiles, getPullRequestFiles } from "./github/pulls-files";

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
      console.log("Run PR analysis");
      console.log("Repository:", repository);
      console.log("PR Number:", prNumber);
      console.log("Installation ID:", installationId);

      const token = await getInstallationToken(installationId);
      console.log("Installation token received:", token.slice(0, 10));

      const files = await getPullRequestFiles(repository, prNumber, token);

      console.log(
        "PR Files:",
        files.map((f: any) => f.filename),
      );

      // const diff = buildDiffFromFiles(files);

      // console.log("DIFF:");
      // console.log(diff);
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
