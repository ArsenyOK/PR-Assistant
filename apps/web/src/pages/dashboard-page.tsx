import AppHeader from "../components/layout/app-header";
import PageContainer from "../components/layout/page-container";

const mockReviews = [
  {
    id: "1",
    repository: "ArsenyOK/PR-Assistant",
    title: "Add AI review command path",
    risk: "Medium",
    updatedAt: "2 min ago",
    filesAnalyzed: 6,
  },
  {
    id: "2",
    repository: "ArsenyOK/PR-Assistant",
    title: "Improve review stats output",
    risk: "Low",
    updatedAt: "15 min ago",
    filesAnalyzed: 4,
  },
];

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
            <article
              key={review.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{review.repository}</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {review.title}
                  </h2>
                </div>

                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-300">
                  {review.risk} risk
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-400">
                <span>Updated: {review.updatedAt}</span>
                <span>Files analyzed: {review.filesAnalyzed}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageContainer>
  );
};

export default DashboardPage;
