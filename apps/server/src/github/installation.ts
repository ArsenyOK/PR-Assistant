import { generateAppJwt } from "./auth";

export const getInstallationToken = async (installationId: number) => {
  const jwtToken = generateAppJwt();

  const response = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `Failed to get installation token: ${response.status} ${response.statusText}\n${text}`,
    );
  }

  if (!text) {
    throw new Error("Empty response body while getting installation token");
  }

  const data = JSON.parse(text);
  return data.token as string;
};
