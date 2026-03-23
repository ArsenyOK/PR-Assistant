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
