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
    stats: {
      filesIgnored: 2,
      diffLength: 10684,
      truncatedFilesCount: 2,
      projectType: "backend",
    },
    suggestions: [
      "Make risk parsing more resilient to small markdown format changes.",
      "Consider keeping /review as an alias for backward compatibility.",
    ],
    potentialIssues: [
      "Risk label parsing is currently dependent on a strict markdown format.",
      "Sequential label updates may leave PR labels in a partial state if one request fails.",
    ],
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
    stats: {
      filesIgnored: 1,
      diffLength: 5240,
      truncatedFilesCount: 0,
      projectType: "frontend",
    },
    suggestions: [
      "Extract repeated card sections into reusable UI building blocks.",
    ],
    potentialIssues: [],
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
    stats: {
      filesIgnored: 3,
      diffLength: 14890,
      truncatedFilesCount: 1,
      projectType: "backend",
    },
    suggestions: [
      "Add a safer fallback path when risk parsing fails.",
      "Log label update failures with enough context for debugging.",
    ],
    potentialIssues: [
      "The parser is brittle if the LLM slightly changes the section formatting.",
      "Risk label updates are external API calls and may fail independently.",
    ],
  },
];
