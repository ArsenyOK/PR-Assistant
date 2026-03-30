import { Review } from "../types";

export const mockReviews: Review[] = [
  {
    id: "1",
    repository: "ArsenyOK/PR-Assistant",
    title: "Add AI review command path",
    risk: "Medium",
    updatedAt: "2 min ago",
    filesAnalyzed: 6,
    summary:
      "Adds manual PR review flow via /ai-review, introduces risk labels, and improves prompt rules.",
  },
  {
    id: "2",
    repository: "ArsenyOK/PR-Assistant",
    title: "Improve review stats output",
    risk: "Low",
    updatedAt: "15 min ago",
    filesAnalyzed: 4,
    summary:
      "Improves review stats presentation and refactors dashboard rendering into reusable components.",
  },
  {
    id: "3",
    repository: "ArsenyOK/PR-Assistant",
    title: "Parse risk level from AI output",
    risk: "High",
    updatedAt: "1 hour ago",
    filesAnalyzed: 8,
    summary:
      "Adds parsing logic for risk level and updates labels after AI review completes.",
  },
];
