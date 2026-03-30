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
export type RiskLevel = "low" | "medium" | "high";

export type ReviewStats = {
  filesIgnored: number;
  diffLength: number;
  truncatedFilesCount: number;
  projectType: string;
};

export type Review = {
  id: string;
  repository: string;
  title: string;
  risk: RiskLevel;
  updatedAt: string;
  filesAnalyzed: number;
  summary?: string;
  suggestions?: string[];
  potentialIssues?: string[];
  stats?: ReviewStats;
};

export type SaveReviewToDatabaseParams = {
  githubInstallationId: number;
  accountLogin: string;
  accountType: string;
  repositoryFullName: string;
  githubRepoId: number;
  prNumber: number;
  title: string;
  state: string;
  branchName?: string;
  baseBranch?: string;
  reviewMarkdown: string;
  summary?: string | null;
  riskLevel?: string | null;
  projectType?: string | null;
  stats: {
    filesAnalyzed: number;
    filesIgnored: number;
    diffLength: number;
    truncatedFiles: number;
  };
};
