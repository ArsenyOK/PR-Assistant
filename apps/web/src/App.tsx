import type { AIReviewResult } from "@pr-assistant/shared";

const mockReview: AIReviewResult = {
  summary: "Test summary",
  risks: ["Potential auth regression"],
  suggestions: [{ file: "src/App.tsx", note: "Test suggestion" }],
};

const App = () => {
  return (
    <div>
      <h1>PR Assistant Web</h1>
      <p>{mockReview.summary}</p>
    </div>
  );
};

export default App;
