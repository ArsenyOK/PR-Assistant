const DashboardEmptyState = () => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl">
        📭
      </div>

      <h2 className="mt-4 text-xl font-semibold text-white">No reviews yet</h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
        Install the GitHub App, open a pull request, and run{" "}
        <span className="text-slate-200">/ai-review</span> to generate your
        first review.
      </p>
    </div>
  );
};

export default DashboardEmptyState;
