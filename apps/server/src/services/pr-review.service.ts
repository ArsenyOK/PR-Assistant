import { openai } from "../lib/openai";
import { ReviewContext } from "../types";

export async function generateReview(prompt: string): Promise<string> {
  const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

  if (!prompt.trim()) {
    return "No review generated.";
  }

  const response = await openai.responses.create({
    model,
    input: prompt,
  });

  const output = response.output_text?.trim();

  console.info(output, "output");

  if (!output) {
    return `
## 🤖 PR Review

### Summary
- No review generated.

### Potential issues
- No obvious issues found.

### Suggestions
- No concrete suggestions.

### Best practice examples
- No example needed.
`.trim();
  }

  return output;
}

export function buildReviewPrompt(context: ReviewContext): string {
  const { diff, usedFiles, ignoredFiles, projectType, customRules } = context;

  const projectSpecificFocus = {
    frontend: `
Focus especially on:
- component structure and readability
- state management and side effects
- hooks usage and dependency correctness
- rendering performance and unnecessary re-renders
- prop typing and maintainability
- UI/UX regressions visible from the diff
`,
    backend: `
Focus especially on:
- architecture boundaries
- service separation
- validation and input safety
- error handling and failure paths
- API reliability
- security concerns
- typing correctness
- maintainability of backend flows
`,
    fullstack: `
Focus especially on:
- API contract consistency
- backend/frontend integration risks
- data flow correctness
- validation on both sides
- maintainability across layers
- breaking changes between backend and frontend
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
You are a senior TypeScript engineer performing a pull request review.

Your job is to provide a high-signal review.
Do not try to find issues just to be critical.
Only mention issues that are reasonably supported by the diff.
If something is uncertain, say so clearly.

Project type: ${projectType}

Files analyzed:
${usedFiles.map((f) => `- ${f}`).join("\n")}

Ignored files:
${ignoredFiles.length ? ignoredFiles.map((f) => `- ${f}`).join("\n") : "- none"}

Team code review rules:
${customRules.map((r) => `- ${r}`).join("\n")}

${projectSpecificFocus[projectType]}

Return markdown with exactly these sections and headings:

## 🤖 PR Review

### Summary
- 2 to 4 bullet points
- Briefly describe what changed
- Mention the main intent of the PR

### Potential issues
- List only meaningful issues supported by the diff
- Focus on bugs, maintainability risks, architecture problems, typing problems, reliability issues, and obvious security concerns
- For each issue, explain why it matters
- If there are no clear issues, write exactly:
- No obvious issues found.

### Suggestions
- Provide concrete, actionable improvements
- Keep suggestions practical and relevant to the changed code
- If there are no concrete suggestions, write exactly:
- No concrete suggestions.

### Best practice examples
- Only include this section if there is at least one suggestion where a short code example would be genuinely helpful
- Provide at most 2 short examples
- Keep examples concise and realistic
- Use fenced \`\`\`ts or \`\`\`tsx code blocks
- Do not rewrite the whole file
- Show only the improved pattern or snippet
- If no useful code example is needed, write exactly:
- No example needed.

Review rules:
- Be concise, clear, and specific
- Do not invent files, bugs, or architectural context
- Do not mention issues without evidence from the diff
- Prefer 2 strong observations over 10 weak ones
- Avoid generic advice like "improve readability" unless you explain how
- When possible, align suggestions with the team rules
- Treat frontend and backend concerns differently based on the files changed
- If the diff is partial or truncated, mention uncertainty where relevant

Pull request diff:
${diff}
`.trim();
}
