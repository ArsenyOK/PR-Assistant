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