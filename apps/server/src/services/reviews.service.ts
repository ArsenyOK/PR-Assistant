import { prisma } from "../lib/prisma";
import { SaveReviewToDatabaseParams } from "../types";

export async function getReviews() {
  return prisma.review.findMany({
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
}

export async function getReviewById(id: string) {
  return prisma.review.findUnique({
    where: { id },
    include: {
      pullRequest: {
        include: {
          repository: true,
        },
      },
    },
  });
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
