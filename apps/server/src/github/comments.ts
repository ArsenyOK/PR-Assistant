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

export async function getPullRequestComments(
  repository: string,
  prNumber: number,
  token: string,
) {
  const response = await fetch(
    `https://api.github.com/repos/${repository}/issues/${prNumber}/comments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to get comments: ${text}`);
  }

  return JSON.parse(text);
}

export async function updateComment(
  repository: string,
  commentId: number,
  token: string,
  body: string,
) {
  const response = await fetch(
    `https://api.github.com/repos/${repository}/issues/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    },
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to update comment: ${text}`);
  }
}

export async function createOrUpdatePRReview(
  repository: string,
  prNumber: number,
  token: string,
  review: string,
) {
  const comments = await getPullRequestComments(repository, prNumber, token);

  const marker = "<!-- PR_ASSISTANT_REVIEW -->";

  const existingComment = comments.find((c: any) => c.body?.includes(marker));

  const body = `${marker}\n${review}`;

  if (existingComment) {
    console.log("Updating existing review comment");
    await updateComment(repository, existingComment.id, token, body);
  } else {
    console.log("Creating new review comment");
    await addPullRequestComment(repository, prNumber, token, body);
  }
}
