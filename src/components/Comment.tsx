"use client";

import { useState } from "react";
import { ExpandedComment } from "@/server/db/comments";
import { getCommentReplies } from "@/actions/comments";
import CommentForm from "./CommentForm";
import Image from "next/image";

interface CommentProps {
  comment: ExpandedComment;
  language: string;
  depth?: number;
}

export default function Comment({ comment, language, depth = 0 }: CommentProps) {
  const [replies, setReplies] = useState<ExpandedComment[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleToggleReplies = async () => {
    if (!showReplies && replies.length === 0) {
      setLoadingReplies(true);
      try {
        const fetchedReplies = await getCommentReplies(comment.id);
        setReplies(fetchedReplies);
      } catch (error) {
        console.error("Failed to load replies:", error);
      } finally {
        setLoadingReplies(false);
      }
    }
    setShowReplies(!showReplies);
  };

  const handleReplyAdded = (newReply: ExpandedComment) => {
    setReplies(prev => [...prev, newReply]);
    setShowReplyForm(false);
    if (!showReplies) {
      setShowReplies(true);
    }
  };

  const maxDepth = 5;
  const shouldNest = depth < maxDepth;

  return (
    <div className={`${depth > 0 ? "ml-6 mt-3" : ""}`}>
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <div className="flex items-start gap-3">
            {comment.author.image && (
              <Image
                src={comment.author.image}
                alt={comment.author.name ?? "Unknown user"}
                width={64}
                height={64}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-sm">{comment.author.name}</span>
                <span className="text-xs text-base-content/60">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap break-words">{comment.content}</p>
              
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={handleToggleReplies}
                  className="text-xs text-base-content/70 hover:text-base-content transition-colors"
                  disabled={loadingReplies}
                >
                  {loadingReplies ? (
                    "Loading..."
                  ) : showReplies ? (
                    "Hide replies"
                  ) : (
                    "Show replies"
                  )}
                </button>
                <button 
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-xs text-base-content/70 hover:text-base-content transition-colors"
                >
                  Reply
                </button>
              </div>

              {showReplyForm && (
                <div className="mt-3">
                  <CommentForm
                    replyTo={comment.id}
                    replyType="comment"
                    language={language}
                    onCommentAdded={handleReplyAdded}
                    onCancel={() => setShowReplyForm(false)}
                    placeholder="Write a reply..."
                    compact={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showReplies && replies.length > 0 && shouldNest && (
        <div className="mt-2">
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} language={language} depth={depth + 1} />
          ))}
        </div>
      )}

      {showReplies && replies.length > 0 && !shouldNest && (
        <div className="mt-2 p-3 bg-base-300 rounded-lg">
          <p className="text-xs text-base-content/60 mb-2">
            Replies are too deeply nested. View in full thread.
          </p>
          {replies.map((reply) => (
            <div key={reply.id} className="text-sm p-2 bg-base-100 rounded mb-2 last:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-xs">{reply.author.name}</span>
                <span className="text-xs text-base-content/60">
                  {new Date(reply.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs whitespace-pre-wrap break-words">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
