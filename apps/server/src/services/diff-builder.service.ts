import { REVIEW_CONFIG } from "../config/review.config";
import { PullRequestFile } from "../github/pulls-files";

const IGNORED_FILE_NAMES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
]);

const IGNORED_PATH_PARTS = ["dist/", "build/", ".next/", "coverage/"];

const IGNORED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
  ".pdf",
];

function shouldIgnoreFile(file: PullRequestFile): boolean {
  const fileName = file.filename.toLowerCase();
  const baseName = fileName.split("/").pop() || "";

  if (IGNORED_FILE_NAMES.has(baseName)) {
    return true;
  }

  if (IGNORED_PATH_PARTS.some((part) => fileName.includes(part))) {
    return true;
  }

  if (IGNORED_EXTENSIONS.some((ext) => fileName.endsWith(ext))) {
    return true;
  }

  if (!file.patch) {
    return true;
  }

  return false;
}

function truncatePatch(patch: string, maxChars: number): string {
  if (patch.length <= maxChars) {
    return patch;
  }

  return `${patch.slice(0, maxChars)}\n... [truncated]`;
}

export function prepareFilesForReview(files: PullRequestFile[]) {
  const includedFiles: PullRequestFile[] = [];
  const ignoredFiles: string[] = [];

  for (const file of files) {
    if (shouldIgnoreFile(file)) {
      ignoredFiles.push(file.filename);
      continue;
    }

    includedFiles.push(file);

    if (includedFiles.length >= REVIEW_CONFIG.MAX_FILES) {
      break;
    }
  }

  return {
    includedFiles,
    ignoredFiles,
  };
}

export function buildDiffFromFiles(files: PullRequestFile[]) {
  let diff = "";
  const usedFiles: string[] = [];
  let truncatedFilesCount = 0;

  for (const file of files) {
    if (!file.patch) continue;

    const truncatedPatch = truncatePatch(
      file.patch,
      REVIEW_CONFIG.MAX_PATCH_CHARS_PER_FILE,
    );

    const block = [
      `File: ${file.filename}`,
      `Status: ${file.status}`,
      truncatedPatch,
      "",
    ].join("\n");

    if (diff.length + block.length > REVIEW_CONFIG.MAX_TOTAL_DIFF_CHARS) {
      break;
    }

    if (truncatedPatch.includes("[truncated]")) {
      truncatedFilesCount += 1;
    }

    usedFiles.push(file.filename);
    diff += block;
  }

  return {
    diff,
    usedFiles,
    truncatedFilesCount,
  };
}
