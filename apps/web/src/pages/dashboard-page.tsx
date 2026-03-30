import ReviewCard from "../components/dashboard/review-card";
import AppHeader from "../components/layout/app-header";
import PageContainer from "../components/layout/page-container";
import { mockReviews } from "../utils/mockData";

const DashboardPage = () => {
  return (
    <PageContainer>
      <AppHeader />

      <section className="py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-300">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              Recent PR reviews
            </h1>
            <p className="mt-2 text-slate-400">
              Track recent reviews, risk levels, and activity across pull
              requests.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
};

export default DashboardPage;
