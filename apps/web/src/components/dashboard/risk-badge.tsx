import { RiskLevel } from "../../types";

const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-emerald-500/15 text-emerald-300",
  Medium: "bg-amber-500/15 text-amber-300",
  High: "bg-rose-500/15 text-rose-300",
};

type RiskBadgeProps = {
  risk: RiskLevel;
};

const RiskBadge = ({ risk }: RiskBadgeProps) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${riskStyles[risk]}`}
    >
      {risk} risk
    </span>
  );
};

export default RiskBadge;
