export const CUSTOM_RULES = [
  "Avoid any in TypeScript unless there is a strong reason",
  "Prefer explicit error handling for external API calls",
  "Keep route handlers thin and move business logic to services",
  "Frontend components should not contain heavy business logic",
  "Prefer pointing out real risks over style preferences",
  "Do not suggest changes without explaining why",
  "Avoid generic advice",
  "If code is good, explicitly say that",
  "Focus on correctness, architecture, and maintainability first",
  "Style issues are lowest priority",
];

export const RISK_LABELS = ["ai-risk-low", "ai-risk-medium", "ai-risk-high"];

export const IGNORED_FILE_NAMES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
]);

export const IGNORED_PATH_PARTS = ["dist/", "build/", ".next/", "coverage/"];

export const IGNORED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
  ".pdf",
];
