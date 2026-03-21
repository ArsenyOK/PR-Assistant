import { generateAppJwt } from "./auth";

export async function getInstallationToken(installationId: number) {
  const jwtToken = generateAppJwt();

  const response = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  const data = await response.json();
  return data.token;
}