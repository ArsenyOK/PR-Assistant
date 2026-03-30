import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviewById } from "../lib/api";
import { Review } from "../types";
import AppHeader from "../components/layout/app-header";
import PageContainer from "../components/layout/page-container";
import RiskBadge from "../components/dashboard/risk-badge";
import ReviewDetailsErrorState from "../components/dashboard/review-details-error-state";

const ReviewDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReview() {
      if (!id) {
        setError("Missing review id");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const data = await getReviewById(id);
        setReview(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load review");
      } finally {
        setIsLoading(false);
      }
    }

    void loadReview();
  }, [id]);

  return (
    <PageContainer>
      <AppHeader />

      <section className="mx-auto w-full max-w-4xl py-12">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="text-sm text-slate-400 transition hover:text-slate-200"
          >
            ← Back to dashboard
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
            <div className="h-5 w-32 animate-pulse rounded bg-slate-800" />
            <div className="mt-4 h-8 w-80 animate-pulse rounded bg-slate-800" />
            <div className="mt-6 h-4 w-full animate-pulse rounded bg-slate-800" />
            <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-800" />
          </div>
        ) : error ? (
          <ReviewDetailsErrorState message={error} />
        ) : !review ? (
          <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-10 text-center">
            <h1 className="text-xl font-semibold text-white">
              Review not found
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              The requested review does not exist.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{review.repository}</p>
                  <h1 className="mt-2 text-3xl font-bold text-white">
                    {review.title}
                  </h1>
                  <p className="mt-3 text-sm text-slate-400">
                    Updated {review.updatedAt}
                  </p>
                </div>

                <RiskBadge risk={review.risk} />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h2 className="text-xl font-semibold text-white">Summary</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {review.summary || "No summary available."}
              </p>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h2 className="text-xl font-semibold text-white">
                Potential issues
              </h2>

              {review.potentialIssues?.length ? (
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  {review.potentialIssues.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-slate-400">
                  No obvious issues found.
                </p>
              )}
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h2 className="text-xl font-semibold text-white">Suggestions</h2>

              {review.suggestions?.length ? (
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  {review.suggestions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-slate-400">
                  No concrete suggestions.
                </p>
              )}
            </section>

            {review.stats ? (
              <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
                <h2 className="text-xl font-semibold text-white">
                  Review stats
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-500">Files analyzed</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {review.filesAnalyzed}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-500">Files ignored</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {review.stats.filesIgnored}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-500">Diff length</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {review.stats.diffLength} chars
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-500">Project type</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {review.stats.projectType}
                    </p>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        )}
      </section>
    </PageContainer>
  );
};

export default ReviewDetailsPage;
