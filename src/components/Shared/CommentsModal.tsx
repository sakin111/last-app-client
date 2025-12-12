"use client";

import  { useEffect, useState } from "react";
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
import { IconMessage2 } from "@tabler/icons-react";
import { getComments, addComment } from "@/services/Dashboard/travel-comments.service";
import { timeAgo } from "@/lib/time-ago";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    profileImage: string;
  };
}

export default function CommentsModal({ travelId }: { travelId: string }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const result = await getComments(travelId);
      if (result.success && Array.isArray(result.data)) {
        setComments(result.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    setSubmitting(true);
    try {
      const result = await addComment(travelId, commentText);
      if (result.success) {
        setCommentText("");
        await fetchComments();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 sm:px-3"
        >
          <IconMessage2 stroke={1.5} className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Comments</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            View and add comments for this travel plan
          </DialogDescription>
        </DialogHeader>

        {/* Comment Input Section */}
        <div className="space-y-3 border-b pb-4">
          <Textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-20 resize-none text-sm"
          />
          <Button
            onClick={handleSubmitComment}
            disabled={submitting || !commentText.trim()}
            className="w-full"
            size="sm"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>

        {/* Comments List Section */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-2 sm:gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                  <AvatarImage
                    src={comment.author?.profileImage}
                    alt={comment.author?.name}
                  />
                  <AvatarFallback>
                    {comment.author?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-gray-900 truncate">
                      {comment.author?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 break-words">
                    {comment.content}
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
