type ReviewDetailsErrorStateProps = {
  message?: string;
};

const ReviewDetailsErrorState = ({
  message = "Something went wrong while loading this review.",
}: ReviewDetailsErrorStateProps) => {
  return (
    <div className="rounded-3xl border border-rose-900/40 bg-rose-950/20 p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-900/20 text-2xl">
        ⚠️
      </div>

      <h2 className="mt-4 text-xl font-semibold text-white">
        Failed to load review
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
        {message}
      </p>
    </div>
  );
};

export default ReviewDetailsErrorState;
