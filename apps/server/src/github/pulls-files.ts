export async function getPullRequestFiles(
  repo: string,
  prNumber: number,
  token: string,
) {
  const response = await fetch(
    `https://api.github.com/repos/${repo}/pulls/${prNumber}/files`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  const data = await response.json();
  return data;
}
