type DashboardStatCardProps = {
  label: string;
  value: string;
  description?: string;
};

const DashboardStatCard = ({
  label,
  value,
  description,
}: DashboardStatCardProps) => {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      ) : null}
    </article>
  );
};

export default DashboardStatCard;
