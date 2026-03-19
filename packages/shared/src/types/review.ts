export type ReviewSuggestion = {
  file: string;
  note: string;
};

export type AIReviewResult = {
  summary: string;
  risks: string[];
  suggestions: ReviewSuggestion[];
};
