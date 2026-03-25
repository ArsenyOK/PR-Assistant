export type PullRequestFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
};

export type ReviewContext = {
  diff: string;
  usedFiles: string[];
  ignoredFiles: string[];
  projectType: "frontend" | "backend" | "fullstack" | "unknown";
  customRules: string[];
};

export type ReviewStatsInput = {
  filesAnalyzed: number;
  filesIgnored: number;
  diffLength: number;
  truncatedFilesCount: number;
  projectType: string;
};

export type SupportedCommand = "/review" | "/ai-review" | "/summary" | "/help";
export type RiskLevel = "low" | "medium" | "high" | null;
