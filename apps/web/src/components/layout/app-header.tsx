import { Link, NavLink } from "react-router-dom";
import { GITHUB_APP_INSTALL_URL } from "../../lib/consts";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-xl px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-slate-800 text-white"
      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200",
  ].join(" ");

const AppHeader = () => {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between gap-4">
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
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <nav className="flex flex-wrap gap-2">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/install" className={navLinkClass}>
            Install
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </nav>

        <a
          href={GITHUB_APP_INSTALL_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
        >
          Install GitHub App
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
