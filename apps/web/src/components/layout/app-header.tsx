import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 pb-5">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-lg">
          🤖
        </div>

        <div>
          <p className="text-lg font-semibold text-white">MergeAssistant</p>
          <p className="text-sm text-slate-400">
            AI pull request reviews for GitHub
          </p>
        </div>
      </Link>

      <Link
        to="/install"
        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
      >
        Install GitHub App
      </Link>
    </header>
  );
};

export default AppHeader;
