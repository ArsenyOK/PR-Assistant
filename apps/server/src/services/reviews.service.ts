import { prisma } from "../lib/prisma";
import { SaveReviewToDatabaseParams } from "../types";
import { normalizeRiskLevel } from "../utils/utils";

function extractSection(
  markdown: string | null | undefined,
  sectionTitle: string,
): string[] {
  if (!markdown) return [];

  const escapedTitle = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `### ${escapedTitle}\\s*([\\s\\S]*?)(?=\\n### |$)`,
    "i",
  );
  const match = markdown.match(regex);

  if (!match) return [];

  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, "").trim());
}

function mapReviewToDto(review: any) {
  return {
    id: review.id,
    repository: review.pullRequest.repository.fullName,
    title: review.pullRequest.title,
    risk: normalizeRiskLevel(review.riskLevel),
    updatedAt: review.updatedAt,
    filesAnalyzed: review.filesAnalyzed ?? 0,
    summary: review.summary ?? "",
    potentialIssues: extractSection(
      review.fullReviewMarkdown,
      "Potential issues",
    ),
    suggestions: extractSection(review.fullReviewMarkdown, "Suggestions"),
    stats: {
      filesIgnored: review.filesIgnored ?? 0,
      diffLength: review.diffLength ?? 0,
      truncatedFilesCount: review.truncatedFiles ?? 0,
      projectType: review.projectType ?? "unknown",
    },
  };
}

export async function getReviews() {
  const reviews = await prisma.review.findMany({
    include: {
      pullRequest: {
        include: {
          repository: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews.map(mapReviewToDto);
}

export async function getReviewById(id: string) {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      pullRequest: {
        include: {
          repository: true,
        },
      },
    },
  });

  if (!review) {
    return null;
  }

  return mapReviewToDto(review);
}

export async function saveReviewToDatabase({
  githubInstallationId,
  accountLogin,
  accountType,
  repositoryFullName,
  githubRepoId,
  prNumber,
  title,
  state,
  branchName,
  baseBranch,
  reviewMarkdown,
  summary,
  riskLevel,
  projectType,
  stats,
}: SaveReviewToDatabaseParams) {
  console.log("Saving review to database...");
  const [owner, name] = repositoryFullName.split("/");

  const installation = await prisma.githubInstallation.upsert({
    where: {
      githubInstallationId,
    },
    update: {
      accountLogin,
      accountType,
    },
    create: {
      githubInstallationId,
      accountLogin,
      accountType,
    },
  });

  const repository = await prisma.repository.upsert({
    where: {
      githubRepoId,
    },
    update: {
      fullName: repositoryFullName,
      owner,
      name,
      installationId: installation.id,
    },
    create: {
      githubRepoId,
      fullName: repositoryFullName,
      owner,
      name,
      installationId: installation.id,
    },
  });

  const existingPullRequest = await prisma.pullRequest.findFirst({
    where: {
      githubPrNumber: prNumber,
      repositoryId: repository.id,
    },
  });

  const pullRequest = existingPullRequest
    ? await prisma.pullRequest.update({
        where: {
          id: existingPullRequest.id,
        },
        data: {
          title,
          state,
          branchName,
          baseBranch,
        },
      })
    : await prisma.pullRequest.create({
        data: {
          githubPrNumber: prNumber,
          title,
          state,
          branchName,
          baseBranch,
          repositoryId: repository.id,
        },
      });

  const review = await prisma.review.create({
    data: {
      pullRequestId: pullRequest.id,
      riskLevel: riskLevel ?? "Unknown",
      summary: summary ?? null,
      fullReviewMarkdown: reviewMarkdown,
      projectType: projectType ?? null,
      filesAnalyzed: stats.filesAnalyzed,
      filesIgnored: stats.filesIgnored,
      diffLength: stats.diffLength,
      truncatedFiles: stats.truncatedFiles,
      triggerType: "ai-review",
    },
  });

  console.log("Review saved with id:", review.id);

  return review;
}
