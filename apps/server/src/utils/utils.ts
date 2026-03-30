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

// support React instead of Angular. Angular support will be added later
export function detectProjectType(
  files: string[],
): "frontend" | "backend" | "fullstack" | "unknown" {
  const normalized = files.map((f) => f.toLowerCase());

  const hasFrontend = normalized.some(
    (f) =>
      f.includes("/web/") ||
      f.endsWith(".tsx") ||
      f.endsWith(".jsx") ||
      f.includes("components/") ||
      f.includes("pages/") ||
      f.includes("hooks/"),
  );

  const hasBackend = normalized.some(
    (f) =>
      f.includes("/server/") ||
      f.includes("controllers/") ||
      f.includes("services/") ||
      f.includes("routes/") ||
      f.includes("middlewares/") ||
      f.endsWith(".sql"),
  );

  if (hasFrontend && hasBackend) return "fullstack";
  if (hasFrontend) return "frontend";
  if (hasBackend) return "backend";
  return "unknown";
}

export function extractSummaryFromReview(review: string) {
  const match = review.match(/## Summary([\s\S]*?)##/);

  if (!match) return null;

  return match[1].trim();
}
