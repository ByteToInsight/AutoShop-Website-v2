import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md";
}

export function Rating({ value, count, size = "sm" }: RatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {stars.map((star) => (
          <Star
            key={star}
            className={cn(
              size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4",
              star <= Math.round(value)
                ? "fill-[#E53935] text-[#E53935]"
                : "fill-[#ECECEC] text-[#ECECEC]"
            )}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-[#666666]">({count})</span>
      )}
    </div>
  );
}
