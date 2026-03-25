import { createOrUpdatePRReview } from "../github/comments";
import { getInstallationToken } from "../github/installation";
import { addRiskLabel, removeRiskLabels } from "../github/label";
import { getPullRequestFiles } from "../github/pulls-files";
import { addLabel, detectProjectType } from "../utils/utils";
import {
  prepareFilesForReview,
  buildDiffFromFiles,
} from "./diff-builder.service";
import { buildReviewPrompt, generateReview } from "./pr-review.service";
import { parseRiskLevel } from "./review-parser.service";
import { buildReviewStatsBlock } from "./review-stats.service";

type RunPullRequestReviewParams = {
  repository: string;
  prNumber: number;
  installationId: number;
  customRules: string[];
};

export async function runPullRequestReview({
  repository,
  prNumber,
  installationId,
  customRules,
}: RunPullRequestReviewParams) {
  const token = await getInstallationToken(installationId);

  const files = await getPullRequestFiles(repository, prNumber, token);

  const { includedFiles, ignoredFiles } = prepareFilesForReview(files);

  const { diff, usedFiles, truncatedFilesCount } =
    buildDiffFromFiles(includedFiles);

  const projectType = detectProjectType(usedFiles);

  const prompt = buildReviewPrompt({
    diff,
    usedFiles,
    ignoredFiles,
    projectType,
    customRules,
  });

  const review = await generateReview(prompt);

  const statsBlock = buildReviewStatsBlock({
    filesAnalyzed: usedFiles.length,
    filesIgnored: ignoredFiles.length,
    diffLength: diff.length,
    truncatedFilesCount,
    projectType,
  });

  const finalReview = `${review}\n\n${statsBlock}`;

  await createOrUpdatePRReview(repository, prNumber, token, finalReview);
  await addLabel(repository, prNumber, token, "ai-reviewed");

  const riskLevel = parseRiskLevel(review);

  if (riskLevel) {
    await removeRiskLabels(repository, prNumber, token);
    await addRiskLabel(repository, prNumber, token, riskLevel);
  }

  return {
    review,
    diff,
    usedFiles,
    ignoredFiles,
    truncatedFilesCount,
    projectType,
    riskLevel,
  };
}
