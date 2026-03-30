export async function getPullRequest(
  repository: string,
  prNumber: number,
  token: string,
) {
  const response = await fetch(
    `https://api.github.com/repos/${repository}/pulls/${prNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pull request");
  }

  return response.json();
}
