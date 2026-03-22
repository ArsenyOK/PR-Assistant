export async function generateReview(diff: string): Promise<string> {
  return `
## 🤖 PR Review

### Summary
Looks good overall, but consider the following improvements:

### Suggestions
- Add error handling in services
- Move GitHub logic to separate module
- Consider using environment validation

### Files changed
Review based on diff analysis.
`;
}

export function buildReviewPrompt(diff: string) {
  return `
You are a senior software engineer performing a code review.

Analyze the following pull request diff and provide:

1. Summary of changes
2. Potential bugs
3. Code quality issues
4. Performance issues
5. Security issues
6. Suggestions for improvement

Be concise and structured.

Pull request diff:
${diff}
`;
}
