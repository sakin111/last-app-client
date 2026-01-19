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
import {
  getReviews,
  addReview,
} from "@/services/Dashboard/travel-comments.service";
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
    profileImage?: string;
  };
}


export default function ReviewsModal({ targetId,checkSub }: {targetId:string, checkSub?: any}) {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);


  const fetchReviews = async () => {
    setLoading(true);
    try {
      const result = await getReviews(targetId);
      if (result?.success && Array.isArray(result.data)) {
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

    try {
      setSubmitting(true);

      const token = await getCookie("accessToken");
      if (!token) {
        toast.error("Please login to post a review");
        setOpen(false);
        return;
      }
      if (!checkSub) {
        toast("you must subscribe to post a review");
        setOpen(false);
        return;
      }

      const result = await addReview(targetId, rating, content);

      if (result?.success) {
        toast.success("Review added successfully!");
        setContent("");
        setRating(5);
        await fetchReviews();
      } else {
       
        console.error("Add review error:", result);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  useEffect(() => {
    if (open) fetchReviews();
  }, [open, targetId]);

  const RatingStar = ({ value }: { value: number }) => (
    <button
      type="button"
      onClick={() => setRating(value)}
      onMouseEnter={() => setHoveredRating(value)}
      onMouseLeave={() => setHoveredRating(0)}
      className="focus:outline-none transition-transform hover:scale-110"
    >
      <IconStar
        className={`w-6 h-6 ${
          value <= (hoveredRating || rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <IconOctagonPlus className="w-4 h-4" />
          Reviews
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reviews & Ratings</DialogTitle>
          <DialogDescription>
            Help other travelers by sharing your experience
          </DialogDescription>
        </DialogHeader>

        {reviews.length > 0 && (
          <div className="flex items-center gap-2 bg-primary/10 p-3 rounded">
            <span className="text-2xl font-bold">{avgRating}</span>
            <IconStar className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              ({reviews.length})
            </span>
          </div>
        )}

        {/* Review form */}
        <div className="space-y-3 border-b pb-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <RatingStar key={v} value={v} />
            ))}
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience..."
          />

          <Button
            onClick={handleSubmitReview}
            disabled={submitting || !content.trim()}
          >
            {submitting ? "Posting..." : "Post Review"}
          </Button>
        </div>

        {/* Reviews list */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading reviews...
            </p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No reviews yet.
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="flex gap-3 p-3 bg-muted rounded">
                <Avatar>
                  <AvatarImage src={review.author.profileImage} />
                  <AvatarFallback>
                    {review.author.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {review.author.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {timeAgo(review.createdAt)}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <IconStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm mt-1">{review.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
