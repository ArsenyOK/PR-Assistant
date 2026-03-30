import { useEffect, useMemo, useState } from "react";
import DashboardStatCard from "../components/dashboard/dashboard-stat-card";
import ReviewCard from "../components/dashboard/review-card";
import AppHeader from "../components/layout/app-header";
import PageContainer from "../components/layout/page-container";
import { Review } from "../types";
import { getReviews } from "../lib/api";
import DashboardLoadingState from "../components/dashboard/dashboard-loading-state";
import DashboardEmptyState from "../components/dashboard/dashboard-empty-state";
import DashboardErrorState from "../components/dashboard/dashboard-error-state";

const DashboardPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);

      try {
        const data = await getReviews();
        setReviews(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    }

    void loadReviews();
  }, []);

  const totalReviews = reviews.length;

  const highRiskCount = useMemo(
    () => reviews.filter((review) => review.risk === "High").length,
    [reviews],
  );

  const mediumRiskCount = useMemo(
    () => reviews.filter((review) => review.risk === "Medium").length,
    [reviews],
  );

  return (
    <PageContainer>
      <AppHeader />

      <section className="py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-300">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              Recent PR reviews
            </h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Track recent reviews, risk levels, and activity across pull
              requests.
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            label="Total reviews"
            value={String(totalReviews)}
            description="Recent AI reviews across connected repositories."
          />
          <DashboardStatCard
            label="High risk PRs"
            value={String(highRiskCount)}
            description="Pull requests that may need extra attention."
          />
          <DashboardStatCard
            label="Medium risk PRs"
            value={String(mediumRiskCount)}
            description="Changes with moderate regression or design risk."
          />
          <DashboardStatCard
            label="Repositories"
            value="1"
            description="Repositories currently connected to MergeAssistant."
          />
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="mb-4 flex items-center justify-between px-2 pt-2">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Review activity
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Latest pull request reviews with risk level and summary.
              </p>
            </div>
          </div>

          {isLoading ? (
            <DashboardLoadingState />
          ) : error ? (
            <DashboardErrorState message={error} />
          ) : reviews.length === 0 ? (
            <DashboardEmptyState />
          ) : (
            <div className="grid gap-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageContainer>
  );
};

export default DashboardPage;
