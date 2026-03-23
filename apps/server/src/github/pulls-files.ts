export const getPullRequestFiles = async (
  repository: string,
  prNumber: number,
  token: string,
) => {
  const response = await fetch(
    `https://api.github.com/repos/${repository}/pulls/${prNumber}/files`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `Failed to get PR files: ${response.status} ${response.statusText}\n${text}`,
    );
  }

  if (!text) {
    throw new Error("Empty response body while getting PR files");
  }

  return JSON.parse(text);
};

export function buildDiffFromFiles(files: any[]) {
  let diff = "";

  for (const file of files) {
    if (!file.patch) continue;

    diff += `\nFile: ${file.filename}\n`;
    diff += file.patch;
    diff += "\n\n";
  }

  return diff;
}
