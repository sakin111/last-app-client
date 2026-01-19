/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconOctagonPlus, IconStar } from "@tabler/icons-react";
import { getReviews, addReview } from "@/services/Dashboard/travel-comments.service";
import { timeAgo } from "@/lib/time-ago";
import { toast } from "sonner";
import { getCookie } from "@/services/Auth/tokenHandler";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    profileImage: string;
  };
}

export default function ReviewsModal({
  targetId,
  checkSub,
}: {
  targetId: string;
  checkSub?: any;
}) {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const router = useRouter();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const result = await getReviews(targetId);
      if (result.success && Array.isArray(result.data)) {
        setReviews(result.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const token = await getCookie("accessToken");


      if (!token) {
        toast.error("Please login to post a review");
        router.push("/login");
        return;
      }


      if (!checkSub) {
        toast.error("You need an active subscription to post a review");
        router.push("/subscription");
        return;
      }

      const result = await addReview(targetId, rating, content);

      if (result.success) {
        toast.success("Review added successfully!");
        setContent("");
        setRating(5);
        await fetchReviews();
      } else {
        toast.error(result.message || "Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  useEffect(() => {
    if (open) {
      fetchReviews();
    }
  }, [open]);

  const RatingStar = ({ value }: { value: number }) => (
    <button
      type="button"
      onClick={() => setRating(value)}
      onMouseEnter={() => setHoveredRating(value)}
      onMouseLeave={() => setHoveredRating(0)}
      className="focus:outline-none transition-transform hover:scale-110"
    >
      <IconStar
        className={`w-6 h-6 sm:w-7 sm:h-7 ${value <= (hoveredRating || rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
          }`}
      />
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 sm:px-3"
        >
          <IconOctagonPlus stroke={1.5} className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Reviews</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reviews & Ratings</DialogTitle>
          <DialogDescription>
            Help other travelers by sharing your experience
          </DialogDescription>
        </DialogHeader>

        {reviews.length > 0 && (
          <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">
                  {avgRating}
                </span>
                <IconStar className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {reviews.length} review
                {reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3 border-b border-border pb-4">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Your Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <RatingStar key={value} value={value} />
            ))}
          </div>

          <Textarea
            placeholder="Share your experience..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-20 resize-none text-sm"
          />

          <Button
            onClick={handleSubmitReview}
            disabled={submitting || !content.trim()}
            className="w-full"
            size="sm"
          >
            {submitting ? "Posting..." : "Post Review"}
          </Button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review!
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="flex gap-2 sm:gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                  <AvatarImage
                    src={review.author?.profileImage}
                    alt={review.author?.name}
                  />
                  <AvatarFallback>
                    {review.author?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-semibold text-sm text-foreground truncate">
                        {review.author?.name}
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <IconStar
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {timeAgo(review.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 break-words">
                    {review.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
