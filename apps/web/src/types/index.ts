export type RiskLevel = "Low" | "Medium" | "High";

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
