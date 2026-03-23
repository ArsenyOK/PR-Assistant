import { openai } from "../lib/openai";
import { ReviewContext } from "../types";

export async function generateReview(prompt: string): Promise<string> {
  const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

  const response = await openai.responses.create({
    model,
    input: prompt,
  });

  return response.output_text?.trim() || "No review generated.";
}

export function buildReviewPrompt(context: ReviewContext): string {
  const { diff, usedFiles, ignoredFiles, projectType, customRules } = context;

  const projectSpecificFocus = {
    frontend: `
Focus especially on:
- component structure
- state management
- hooks usage
- rendering performance
- UX regressions
- prop typing and maintainability
`,
    backend: `
Focus especially on:
- architecture boundaries
- service separation
- validation
- error handling
- API reliability
- security concerns
- typing correctness
`,
    fullstack: `
Focus especially on:
- API-contract consistency
- backend/frontend integration risks
- data flow correctness
- validation on both sides
- maintainability across layers
`,
    unknown: `
Focus on:
- correctness
- maintainability
- typing
- architecture
- reliability
`,
  };

  return `
You are a senior TypeScript engineer doing a pull request review.

Project type: ${projectType}

Files analyzed:
${usedFiles.map((f) => `- ${f}`).join("\n")}

Ignored files:
${ignoredFiles.length ? ignoredFiles.map((f) => `- ${f}`).join("\n") : "- none"}

Team code review rules:
${customRules.map((r) => `- ${r}`).join("\n")}

${projectSpecificFocus[projectType]}

Return markdown with exactly these sections:

## 🤖 PR Review

### Summary
- Brief summary of what changed

### Potential issues
- Bullet list
- If none, write: "- No obvious issues found."

### Suggestions
- Bullet list
- If none, write: "- No concrete suggestions."

Rules for your review:
- Only mention issues supported by the diff
- Be specific and actionable
- Do not invent files or issues
- Prefer high-signal comments over many weak comments
- Mention severity implicitly through wording, not labels

Pull request diff:
${diff}
`.trim();
}
