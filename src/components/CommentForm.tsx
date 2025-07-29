"use client";

import { useState } from "react";
import { postComment } from "@/actions/comments";
import { ExpandedComment } from "@/server/db/comments";

interface CommentFormProps {
  replyTo: string;
  replyType: "solution" | "comment" | "puzzle";
  language: string;
  onCommentAdded?: (comment: ExpandedComment) => void;
  onCancel?: () => void;
  placeholder?: string;
  compact?: boolean;
}

export default function CommentForm({ 
  replyTo, 
  replyType, 
  language, 
  onCommentAdded, 
  onCancel,
  placeholder = "Write a comment...",
  compact = false
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const commentId = crypto.randomUUID();
      const newComment = await postComment({
        id: commentId,
        replyTo,
        replyType,
        content: content.trim(),
        language,
      });

      setContent("");
      
      // Create expanded comment for UI update
      const expandedComment: ExpandedComment = {
        ...newComment,
        author: {
          id: newComment.author,
          name: "You", // Will be updated when comments refresh
          image: null
        }
      };
      
      onCommentAdded?.(expandedComment);
    } catch (error) {
      console.error("Failed to post comment:", error);
      // Could add error toast here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="flex gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="textarea textarea-bordered textarea-sm flex-1 min-h-0 h-16 resize-none"
            disabled={isSubmitting}
          />
          <div className="flex flex-col gap-1">
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="btn btn-primary btn-sm"
            >
              {isSubmitting ? "..." : "Reply"}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="textarea textarea-bordered w-full min-h-24"
        disabled={isSubmitting}
      />
      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}