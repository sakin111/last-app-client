import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type RatingBreakdown = {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
};

interface RatingBarsProps {
  breakdown?: Partial<RatingBreakdown> | null;
}

const DEFAULT_BREAKDOWN: RatingBreakdown = {
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
};

export function RatingBars({ breakdown }: RatingBarsProps) {
  const safe: RatingBreakdown = { ...DEFAULT_BREAKDOWN, ...(breakdown ?? {}) };
  const total = Object.values(safe).reduce((a, b) => a + b, 0);

  const stars: (keyof RatingBreakdown)[] = [5, 4, 3, 2, 1];

  return (
    <div className="w-full max-w-[220px] space-y-1">
      {stars.map((star) => {
        const count = safe[star];
        const percent = total > 0 ? (count / total) * 100 : 0;

        return (
          <div key={star} className="flex items-center gap-2">
            <span className="w-6 text-xs text-gray-500">{star}★</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="w-6 text-[11px] text-gray-400 text-right tabular-nums">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

