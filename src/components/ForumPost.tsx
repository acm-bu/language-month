"use client";

import { useState } from "react";

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

interface ForumPostProps {
  post: Post;
}

export default function ForumPost({ post }: ForumPostProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = () => {
    // Handle reply submission
    console.log("Replying:", replyContent);
    setReplyContent("");
    setShowReplyForm(false);
  };

  return (
    <div className="card bg-base-200 shadow-sm mb-4">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title text-lg">{post.title}</h3>
            <p className="text-sm opacity-70 mb-2">by {post.author} • {post.timestamp}</p>
          </div>
        </div>
        
        <p className="mb-4">{post.content}</p>
        
        <div className="card-actions justify-between">
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? "Hide" : "Show"} Replies ({post.replies.length})
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Reply
          </button>
        </div>

        {showReplyForm && (
          <div className="mt-4 p-4 bg-base-100 rounded-lg">
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleReply}
                disabled={!replyContent.trim()}
              >
                Post Reply
              </button>
            </div>
          </div>
        )}

        {showReplies && post.replies.length > 0 && (
          <div className="mt-4 space-y-2">
            {post.replies.map((reply) => (
              <div key={reply.id} className="bg-base-100 p-3 rounded-lg ml-4">
                <div className="text-sm opacity-70 mb-1">
                  {reply.author} • {reply.timestamp}
                </div>
                <p>{reply.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}