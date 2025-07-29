"use client";

import { useState } from "react";
import { ExpandedComment } from "@/server/db/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

interface CommentsSectionProps {
  comments: ExpandedComment[];
  replyTo: string;
  replyType: "solution" | "puzzle" | "comment";
  language: string;
  title?: string;
  maxDepth?: number;
}

export default function CommentsSection({ 
  comments: initialComments, 
  replyTo, 
  replyType, 
  language, 
  title = "Comments",
  maxDepth = 5
}: CommentsSectionProps) {
  const [comments, setComments] = useState(initialComments);

  const handleCommentAdded = (newComment: ExpandedComment) => {
    setComments(prev => [...prev, newComment]);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">{title}</h2>
        
        <div className="mb-6">
          <CommentForm
            replyTo={replyTo}
            replyType={replyType}
            language={language}
            onCommentAdded={handleCommentAdded}
            placeholder="Join the discussion..."
          />
        </div>
        
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-base-content/60">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <Comment 
                key={comment.id} 
                comment={comment} 
                language={language}
                maxDepth={maxDepth}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
