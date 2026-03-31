import AppHeader from "../components/layout/app-header";
import PageContainer from "../components/layout/page-container";

export function InstallPage() {
  return (
    <PageContainer>
      <AppHeader />

      <section className="mx-auto w-full max-w-3xl py-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <p className="text-sm font-medium text-cyan-300">
            Install MergeAssistant
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white">
            Connect GitHub and start reviewing pull requests with AI.
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-400">
            Install the GitHub App, open a pull request, and run{" "}
            <span className="text-slate-200">/ai-review</span> in the PR
            conversation.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Step 1</p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                Install the GitHub App
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Add MergeAssistant to your repository or organization.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Step 2</p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                Open a pull request
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                MergeAssistant will post an initial comment with available
                commands.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Step 3</p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                Run /ai-review
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                The bot will analyze the PR, post a structured review, and add
                risk labels.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="https://github.com/apps/mergeassistant"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Install GitHub App
            </a>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default InstallPage;
