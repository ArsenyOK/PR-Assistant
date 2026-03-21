export async function addPullRequestComment(
  repository: string,
  prNumber: number,
  token: string,
  body: string,
) {
  await fetch(
    `https://api.github.com/repos/${repository}/issues/${prNumber}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body,
      }),
    },
  );
}
