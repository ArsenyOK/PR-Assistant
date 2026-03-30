import { Router } from "express";
import {
  getHelpComment,
  getInitialPRComment,
  normalizeCommand,
  parseCommentCommand,
} from "../services/comment-command.service";
import { getInstallationToken } from "../github/installation";
import { addPullRequestComment } from "../github/comments";
import { runPullRequestReview } from "../services/review-runner.service";
import { CUSTOM_RULES } from "../utils/consts";

export const githubWebhookRouter = Router();

githubWebhookRouter.post("/", async (req, res) => {
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
      const rawCommand = parseCommentCommand(commentBody ?? null);

      if (!rawCommand) {
        return res.status(200).send("ok");
      }

      const command = normalizeCommand(rawCommand);

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

      if (command === "/ai-review") {
        const result = await runPullRequestReview({
          repository,
          prNumber,
          installationId,
          customRules: CUSTOM_RULES,
        });

        console.log("Included files:", result.usedFiles);
        console.log("Ignored files:", result.ignoredFiles);
        console.log("Truncated files count:", result.truncatedFilesCount);
        console.log("Final diff length:", result.diff.length);
        console.log("Project type:", result.projectType);
        console.log("Risk level:", result.riskLevel);

        return res.status(200).send("ok");
      }

      return res.status(200).send("ok");
    }

    if (event === "pull_request") {
      const action = req.body.action;
      const prNumber = req.body.pull_request?.number;
      const repository = req.body.repository?.full_name;
      const installationId = req.body.installation?.id;
      const state = req.body.pull_request?.state;

      const shouldCreateInitialComment =
        ["opened", "reopened"].includes(action) && state === "open";

      if (shouldCreateInitialComment) {
        const token = await getInstallationToken(installationId);

        await addPullRequestComment(
          repository,
          prNumber,
          token,
          getInitialPRComment(),
        );
      }

      return res.status(200).send("ok");
    }

    return res.status(200).send("ok");
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return res.status(500).send("Webhook processing failed");
  }
});
