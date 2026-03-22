import "dotenv/config";
import express from "express";
import { getInstallationToken } from "./github/installation";
import { getPullRequestFiles } from "./github/pulls-files";
import {
  buildReviewPrompt,
  generateReview,
} from "./services/pr-review.service";
import {
  addPullRequestComment,
  createOrUpdatePRReview,
} from "./github/comments";
import {
  buildDiffFromFiles,
  prepareFilesForReview,
} from "./services/diff-builder.service";
import {
  getHelpComment,
  parseCommentCommand,
} from "./services/comment-command.service";
import { addLabel } from "./utils/utils";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "server" });
});

app.post("/webhook/github", async (req, res) => {
  try {
    const event = req.headers["x-github-event"];

    if (event === "issue_comment") {
      const authorType = req.body.comment?.user?.type;

      if (authorType === "Bot") {
        return res.status(200).send("ok");
      }

      const action = req.body.action;
      const isPullRequestComment = Boolean(req.body.issue?.pull_request);

      if (action !== "created" || !isPullRequestComment) {
        return res.status(200).send("ok");
      }

      const commentBody = req.body.comment?.body ?? "";
      const command = parseCommentCommand(commentBody);

      if (!command) {
        return res.status(200).send("ok");
      }

      const repository = req.body.repository?.full_name;
      const prNumber = req.body.issue?.number;
      const installationId = req.body.installation?.id;

      const token = await getInstallationToken(installationId);

      if (command === "/help") {
        await addPullRequestComment(
          repository,
          prNumber,
          token,
          getHelpComment(),
        );
        return res.status(200).send("ok");
      }

      if (command === "/summary") {
        const files = await getPullRequestFiles(repository, prNumber, token);
        const { includedFiles } = prepareFilesForReview(files);
        const { diff } = buildDiffFromFiles(includedFiles);

        const summary = `## PR Summary\n\nDiff length: ${diff.length}\nFiles analyzed: ${includedFiles.length}`;
        await addPullRequestComment(repository, prNumber, token, summary);

        return res.status(200).send("ok");
      }

      if (command === "/review") {
        const files = await getPullRequestFiles(repository, prNumber, token);

        const { includedFiles, ignoredFiles } = prepareFilesForReview(files);

        const { diff, usedFiles, truncatedFilesCount } =
          buildDiffFromFiles(includedFiles);

        console.log("Included files:", usedFiles);
        console.log("Ignored files:", ignoredFiles);
        console.log("Truncated files count:", truncatedFilesCount);
        console.log("Final diff length:", diff.length);

        const prompt = buildReviewPrompt(diff);
        const review = await generateReview(prompt);

        await addLabel(repository, prNumber, token, "ai-reviewed");

        await createOrUpdatePRReview(repository, prNumber, token, review);

        return res.status(200).send("ok");
      }
    }

    if (event === "pull_request") {
      const action = req.body.action;
      const prNumber = req.body.pull_request?.number;
      const repository = req.body.repository?.full_name;
      const installationId = req.body.installation?.id;
      const state = req.body.pull_request?.state;

      const shouldReview =
        ["opened", "synchronize", "reopened"].includes(action) &&
        state === "open";

      if (shouldReview) {
        const token = await getInstallationToken(installationId);

        const files = await getPullRequestFiles(repository, prNumber, token);

        const { includedFiles, ignoredFiles } = prepareFilesForReview(files);

        const { diff, usedFiles, truncatedFilesCount } =
          buildDiffFromFiles(includedFiles);

        console.log("Included files:", usedFiles);
        console.log("Ignored files:", ignoredFiles);
        console.log("Truncated files count:", truncatedFilesCount);
        console.log("Final diff length:", diff.length);

        const prompt = buildReviewPrompt(diff);
        const review = await generateReview(prompt);

        await addLabel(repository, prNumber, token, "ai-reviewed");

        await createOrUpdatePRReview(repository, prNumber, token, review);
      } else {
        console.log("Skip event");
      }

      return res.status(200).send("ok");
    }

    return res.status(200).send("ok");
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return res.status(500).send("Webhook processing failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
