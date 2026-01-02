import { Star } from "lucide-react";

export function ProfileRating({
  rating = 0,
  count = 0,
}: {
  rating?: number;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              rating >= i + 1
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}
