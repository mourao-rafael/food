import { ArrowDownIcon } from "lucide-react";
import { cn } from "../_lib/utils";

interface DiscountBadgeProps {
  percentage: number;
  className?: string;
}

const DiscountBadge = ({ percentage, className }: DiscountBadgeProps) => {
  return (
    <div className={cn("top-2 left-2 bg-primary px-2 py-0.5 rounded-full text-white flex items-center", className)}>
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">{percentage}%</span>
    </div>
  )
};

export default DiscountBadge;
