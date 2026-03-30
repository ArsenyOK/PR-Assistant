import { Review } from "../../types";
import RiskBadge from "./risk-badge";

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{review.repository}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            {review.title}
          </h2>
          {review.summary ? (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              {review.summary}
            </p>
          ) : null}
        </div>

        <RiskBadge risk={review.risk} />
      </div>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-400">
        <span>Updated: {review.updatedAt}</span>
        <span>Files analyzed: {review.filesAnalyzed}</span>
      </div>
    </article>
  );
};

export default ReviewCard;
