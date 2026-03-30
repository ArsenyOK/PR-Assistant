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

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `Failed to get pull request: ${response.status} ${response.statusText}\n${text}`,
    );
  }

  return JSON.parse(text);
}
