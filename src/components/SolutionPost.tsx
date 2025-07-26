"use client";

import Link from "next/link";
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
  puzzleId: string;
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
  const [voted, setVoted] = useState<"up" | "down" | null>(null);


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
          <Link 
            className="btn btn-ghost btn-sm"
            href={`/languages/${solution.language}/${solution.puzzleId}/solutions/${solution.id}`}
          >
            Comments and Details
          </Link>
        </div>


      </div>
    </div>
  );
}
