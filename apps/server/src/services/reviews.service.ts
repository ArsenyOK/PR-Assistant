import { prisma } from "../lib/prisma";

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
  repositoryFullName,
  githubRepoId,
  prNumber,
  title,
  reviewMarkdown,
  summary,
  riskLevel,
  projectType,
  stats,
}: any) {
  const [owner, name] = repositoryFullName.split("/");

  // 1. Installation / Repository
  let repository = await prisma.repository.findUnique({
    where: { githubRepoId },
  });

  if (!repository) {
    repository = await prisma.repository.create({
      data: {
        githubRepoId,
        fullName: repositoryFullName,
        owner,
        name,
        installationId: "temp", // потом заменим на реальный installation
      },
    });
  }

  // 2. Pull Request
  let pullRequest = await prisma.pullRequest.findFirst({
    where: {
      githubPrNumber: prNumber,
      repositoryId: repository.id,
    },
  });

  if (!pullRequest) {
    pullRequest = await prisma.pullRequest.create({
      data: {
        githubPrNumber: prNumber,
        title,
        state: "open",
        repositoryId: repository.id,
      },
    });
  }

  // 3. Review
  const review = await prisma.review.create({
    data: {
      pullRequestId: pullRequest.id,
      riskLevel,
      summary,
      fullReviewMarkdown: reviewMarkdown,
      projectType,
      filesAnalyzed: stats.filesAnalyzed,
      filesIgnored: stats.filesIgnored,
      diffLength: stats.diffLength,
      truncatedFiles: stats.truncatedFiles,
      triggerType: "ai-review",
    },
  });

  return review;
}
