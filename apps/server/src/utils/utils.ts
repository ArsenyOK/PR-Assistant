export async function addLabel(
  repository: string,
  prNumber: number,
  token: string,
  label: string,
) {
  await fetch(
    `https://api.github.com/repos/${repository}/issues/${prNumber}/labels`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        labels: [label],
      }),
    },
  );
}
