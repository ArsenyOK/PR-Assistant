import { ReviewStatsInput } from "../types";

export function buildReviewStatsBlock({
  filesAnalyzed,
  filesIgnored,
  diffLength,
  truncatedFilesCount,
  projectType,
}: ReviewStatsInput): string {
  return `
### Review Stats
- Files analyzed: ${filesAnalyzed}
- Files ignored: ${filesIgnored}
- Diff length: ${diffLength} chars
- Truncated files: ${truncatedFilesCount}
- Project type: ${projectType}
`.trim();
}
