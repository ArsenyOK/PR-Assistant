import { SupportedCommand } from "../types";

export function parseCommentCommand(body: string): SupportedCommand | null {
  const normalizedBody = body.trim().toLowerCase();

  if (normalizedBody.startsWith("/ai-review")) {
    return "/ai-review";
  }

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

export function normalizeCommand(
  command: SupportedCommand,
): "/ai-review" | "/summary" | "/help" {
  if (command === "/review") {
    return "/ai-review";
  }

  return command;
}

export function getHelpComment() {
  return `
## MergeAssistant Commands

- \`/ai-review\` — run full AI review for this PR
- \`/summary\` — generate a short PR summary
- \`/help\` — show available commands
`.trim();
}

export function getInitialPRComment() {
  return `
## 🤖 MergeAssistant

I’m ready to review this pull request.

Available commands:
- \`/ai-review\` — run full AI review
- \`/review\` — alias for \`/ai-review\`
- \`/summary\` — generate a short summary
- \`/help\` — show available commands
`.trim();
}
