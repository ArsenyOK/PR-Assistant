export type RiskLevel = "Low" | "Medium" | "High";

export type Review = {
  id: string;
  repository: string;
  title: string;
  risk: RiskLevel;
  updatedAt: string;
  filesAnalyzed: number;
  summary?: string;
};
