import { Link } from "react-router-dom";
import AppHeader from "../components/layout/app-header";
import PageContainer from "../components/layout/page-container";

const LandingPage = () => {
  return (
    <PageContainer>
      <AppHeader />

      <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-cyan-800/60 bg-cyan-900/20 px-3 py-1 text-sm text-cyan-300">
            Manual AI review with risk labels
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Review pull requests faster with AI feedback your team can use.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            MergeAssistant helps teams run AI-powered PR reviews, highlight risk
            level, suggest improvements, and keep review flow clean with
            commands like <span className="text-slate-200">/ai-review</span>.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/install"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Install GitHub App
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            >
              See features
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            <div>
              <span className="block text-xl font-semibold text-white">
                /ai-review
              </span>
              Manual trigger
            </div>
            <div>
              <span className="block text-xl font-semibold text-white">
                ai-risk-*
              </span>
              Risk labels
            </div>
            <div>
              <span className="block text-xl font-semibold text-white">
                PR stats
              </span>
              Review metadata
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
          <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <p className="text-sm text-slate-400">Latest PR Review</p>
              <h2 className="text-lg font-semibold text-white">
                Add AI review command path
              </h2>
            </div>

            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-300">
              Medium risk
            </span>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Summary
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-slate-300">
                <li>• Adds manual PR review flow via /ai-review command.</li>
                <li>• Introduces risk labels based on AI review output.</li>
                <li>• Improves review prompt with stronger review rules.</li>
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Suggestions
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-slate-300">
                <li>
                  • Make risk parsing more resilient to small markdown format
                  changes.
                </li>
                <li>
                  • Consider keeping /review as an alias for backward
                  compatibility.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Review stats
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-slate-500">Files analyzed</p>
                  <p className="mt-1 text-lg font-semibold text-white">6</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-slate-500">Files ignored</p>
                  <p className="mt-1 text-lg font-semibold text-white">2</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-slate-500">Diff length</p>
                  <p className="mt-1 text-lg font-semibold text-white">10.6k</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-slate-500">Project type</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Backend
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="grid gap-4 border-t border-slate-800 py-10 md:grid-cols-3"
      >
        <article className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="text-lg font-semibold text-white">Manual review</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Keep the PR clean and trigger AI only when needed with a simple
            command in the discussion.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="text-lg font-semibold text-white">Risk labels</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Surface review severity with GitHub labels like ai-risk-low,
            ai-risk-medium, and ai-risk-high.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="text-lg font-semibold text-white">Review stats</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Show exactly how many files were analyzed, ignored, and truncated
            for transparent AI reviews.
          </p>
        </article>
      </section>
    </PageContainer>
  );
};

export default LandingPage;
