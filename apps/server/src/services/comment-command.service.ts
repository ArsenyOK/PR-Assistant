export type SupportedCommand = "/review" | "/summary" | "/help";

export function parseCommentCommand(body: string): SupportedCommand | null {
  const normalizedBody = body.trim().toLowerCase();

  if (normalizedBody.startsWith("/review")) {
    return "/review";
  }

  if (normalizedBody.startsWith("/summary")) {
    return "/summary";
  }

  if (normalizedBody.startsWith("/help")) {
    return "/help";
  }

  return null;
}

export function getHelpComment() {
  return `
## MergeAssistant Commands

- \`/review\` — run AI review again
- \`/summary\` — generate a short PR summary
- \`/help\` — show available commands
`;
}
