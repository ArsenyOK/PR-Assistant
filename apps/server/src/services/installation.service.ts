import { prisma } from "../lib/prisma";
import { SaveInstallationParams } from "../types";

export async function saveInstallation({
  githubInstallationId,
  accountLogin,
  accountType,
}: SaveInstallationParams) {
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

  return installation;
}

export async function deleteInstallationByGithubId(
  githubInstallationId: number,
) {
  const installation = await prisma.githubInstallation.findUnique({
    where: {
      githubInstallationId,
    },
  });

  if (!installation) {
    return null;
  }

  return prisma.githubInstallation.delete({
    where: {
      githubInstallationId,
    },
  });
}
