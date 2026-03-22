import { openai } from "../lib/openai";

export async function generateReview(diff: string): Promise<string> {
  const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

  if (!diff.trim()) {
    return `
## 🤖 PR Review

### Summary
No review generated because there was no supported diff content after filtering.

### Potential issues
- No actionable code diff found.

### Suggestions
- Try /review after changing source files instead of generated or ignored files.
`.trim();
  }

  const prompt = `
You are a senior TypeScript backend engineer reviewing a GitHub pull request.

Review the diff and produce markdown with exactly these sections:

## 🤖 PR Review

### Summary
- Short summary of what changed

### Potential issues
- Bullet list
- If none, write: "- No obvious issues found."

### Suggestions
- Bullet list
- If none, write: "- No concrete suggestions."

Constraints:
- Be concise
- Only mention issues supported by the diff
- Focus on bugs, maintainability, typing, architecture, and reliability
- Do not mention files that are not present in the diff

Diff:
${diff}
`;

  const response = await openai.responses.create({
    model,
    input: prompt,
  });

  return response.output_text?.trim() || "No review generated.";
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
