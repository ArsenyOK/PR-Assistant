const RISK_LABELS = ["ai-risk-low", "ai-risk-medium", "ai-risk-high"];

export async function removeRiskLabels(
  repository: string,
  prNumber: number,
  token: string,
) {
  for (const label of RISK_LABELS) {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/issues/${prNumber}/labels/${encodeURIComponent(label)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (response.status !== 404 && !response.ok) {
      const text = await response.text();
      throw new Error(`Failed to remove label ${label}: ${text}`);
    }
  }
}

export async function addRiskLabel(
  repository: string,
  prNumber: number,
  token: string,
  riskLevel: "low" | "medium" | "high",
) {
  const label = `ai-risk-${riskLevel}`;

  const response = await fetch(
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

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to add risk label: ${text}`);
  }
}
