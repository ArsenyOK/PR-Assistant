import { RiskLevel } from "../types";

export function parseRiskLevel(review: string): RiskLevel {
  const match = review.match(/### Risk level\s+[-*]?\s*(Low|Medium|High)/i);

  if (!match) return null;

  const value = match[1].toLowerCase();

  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }

  return null;
}
