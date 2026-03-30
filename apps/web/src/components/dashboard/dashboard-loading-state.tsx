const DashboardLoadingState = () => {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
        >
          <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />
          <div className="mt-4 h-6 w-72 animate-pulse rounded bg-slate-800" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-800" />
          <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-800" />
          <div className="mt-6 flex gap-4">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardLoadingState;
