"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import SubmitSolutionModal from "@/components/SubmitSolutionModal";
import ForumPost from "@/components/ForumPost";

const puzzleData = {
  "day-1": {
    title: "Hello World",
    difficulty: "Easy",
    description: `Welcome to your first puzzle! Your task is to write a program that prints "Hello, World!" to the console.

## Requirements
- Print exactly "Hello, World!" (including the comma and exclamation mark)
- The output should be followed by a newline

## Example Output
\`\`\`
Hello, World!
\`\`\`

This is a classic first program that helps you get familiar with the basic syntax of the language and how to produce output.`,
  },
  "day-2": {
    title: "Sum of Two Numbers",
    difficulty: "Easy",
    description: `Write a program that takes two integers as input and returns their sum.

## Requirements
- Read two integers from input
- Calculate and output their sum
- Handle negative numbers correctly

## Example
Input: 5, 3
Output: 8

Input: -2, 7
Output: 5`,
  },
  "day-5": {
    title: "Fibonacci Sequence",
    difficulty: "Medium",
    description: `Generate the first n numbers in the Fibonacci sequence.

## Requirements
- Take an integer n as input
- Output the first n Fibonacci numbers
- Handle edge cases (n = 0, n = 1)

## Example
Input: 6
Output: 0, 1, 1, 2, 3, 5

The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.`,
  },
};

const forumPosts = [
  {
    id: "1",
    author: "Alice_Dev",
    title: "Need help with input parsing",
    content: "I'm having trouble reading the input correctly. Should I use stdin or command line arguments?",
    timestamp: "2 hours ago",
    replies: [
      {
        id: "1-1",
        author: "Bob_Coder",
        content: "For this challenge, you can use either approach. stdin is more common for competitive programming style problems.",
        timestamp: "1 hour ago",
      }
    ]
  },
  {
    id: "2",
    author: "Charlie_Student",
    title: "Optimization question",
    content: "Is there a more efficient way to solve this? My current solution works but seems slow for large inputs.",
    timestamp: "4 hours ago",
    replies: []
  }
];

export default function PuzzlePage() {
  const params = useParams();
  const language = params.language as string;
  const puzzleId = params.puzzleId as string;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const puzzle = puzzleData[puzzleId as keyof typeof puzzleData];

  if (!puzzle) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Puzzle Not Found</h1>
        <Link href={`/languages/${language}`} className="btn btn-primary">
          Back to Calendar
        </Link>
      </div>
    );
  }

  const handleNewPost = () => {
    console.log("New post:", { title: newPostTitle, content: newPostContent });
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPostForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/languages/${language}`} className="btn btn-ghost btn-sm mb-4">
          ← Back to {language.charAt(0).toUpperCase() + language.slice(1)} Calendar
        </Link>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{puzzle.title}</h1>
            <div className="badge badge-primary">{puzzle.difficulty}</div>
          </div>
          <div className="flex gap-2">
            <Link 
              href={`/languages/${language}/${puzzleId}/solutions`}
              className="btn btn-outline"
            >
              View Solutions
            </Link>
            <button 
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Submit Solution
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Problem Description</h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{puzzle.description}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
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

              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <ForumPost key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubmitSolutionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        puzzleTitle={puzzle.title}
      />
    </div>
  );
}