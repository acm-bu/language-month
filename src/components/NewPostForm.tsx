"use client";

import { useState } from "react";


export default function NewPostForm() {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleNewPost = () => {
    console.log("New post:", { title: newPostTitle, content: newPostContent });
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPostForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title">Discussion Forum</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowNewPostForm(!showNewPostForm)}
        >
          New Post
        </button>
      </div>

      {showNewPostForm && (
        <div className="mb-4 p-4 bg-base-200 rounded-lg">
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Post title..."
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered w-full mb-2"
            placeholder="What's your question or comment?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowNewPostForm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleNewPost}
              disabled={!newPostTitle.trim() || !newPostContent.trim()}
            >
              Post
            </button>
          </div>
        </div>
      )}

    </div>
  )

}
