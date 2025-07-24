"use client";

import { useState } from "react";

interface DisplayComment {
  id: string;
  userId: string;
  author: string;
  content: string;
  timestamp: string;
}

interface DisplaySolution {
  id: string;
  author: string;
  language: string;
  code: string;
  explanation: string;
  timestamp: string;
  votes: number;
  comments: DisplayComment[];
}

interface SolutionPostProps {
  solution: DisplaySolution;
}

export default function SolutionPost({ solution }: SolutionPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  const handleComment = () => {
    console.log("Adding comment:", commentContent);
    setCommentContent("");
    setShowCommentForm(false);
  };

  const handleVote = (type: "up" | "down") => {
    setVoted(voted === type ? null : type);
  };

  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-8">
                  <span className="text-sm">{solution.author[0]}</span>
                </div>
              </div>
              <span className="font-semibold">{solution.author}</span>
              <span className="text-sm opacity-70">• {solution.timestamp}</span>
            </div>
            <div className="badge badge-outline mb-2">{solution.language}</div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <button 
                className={`btn btn-ghost btn-xs ${voted === "up" ? "text-success" : ""}`}
                onClick={() => handleVote("up")}
              >
                ▲
              </button>
              <span className="text-sm font-semibold">{solution.votes + (voted === "up" ? 1 : voted === "down" ? -1 : 0)}</span>
              <button 
                className={`btn btn-ghost btn-xs ${voted === "down" ? "text-error" : ""}`}
                onClick={() => handleVote("down")}
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        {solution.explanation && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p className="text-sm opacity-80">{solution.explanation}</p>
          </div>
        )}

        <div className="mockup-code mb-4">
          <pre><code>{solution.code}</code></pre>
        </div>

        <div className="card-actions justify-between">
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Hide" : "Show"} Comments ({solution.comments.length})
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowCommentForm(!showCommentForm)}
          >
            Add Comment
          </button>
        </div>

        {showCommentForm && (
          <div className="mt-4 p-4 bg-base-200 rounded-lg">
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              placeholder="Share your thoughts on this solution..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setShowCommentForm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleComment}
                disabled={!commentContent.trim()}
              >
                Post Comment
              </button>
            </div>
          </div>
        )}

        {showComments && solution.comments.length > 0 && (
          <div className="mt-4 space-y-3">
            {solution.comments.map((comment) => (
              <div key={comment.id} className="bg-base-200 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="avatar placeholder">
                    <div className="bg-accent text-accent-content rounded-full w-6">
                      <span className="text-xs">{comment.author[0]}</span>
                    </div>
                  </div>
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs opacity-70">• {comment.timestamp}</span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
