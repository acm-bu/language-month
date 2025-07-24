"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import SolutionPost from "@/components/SolutionPost";

const solutionsData = {
  "day-1": [
    {
      id: "1",
      author: "Alice_Dev",
      language: "Python",
      code: `print("Hello, World!")`,
      explanation: "Simple and straightforward approach using Python's built-in print function.",
      timestamp: "3 hours ago",
      votes: 12,
      comments: [
        {
          id: "1-1",
          author: "Bob_Coder",
          content: "Clean and simple! This is exactly what I was looking for.",
          timestamp: "2 hours ago"
        }
      ]
    },
    {
      id: "2",
      author: "Charlie_Student",
      language: "JavaScript",
      code: `console.log("Hello, World!");`,
      explanation: "Using console.log to output the required string in JavaScript.",
      timestamp: "5 hours ago",
      votes: 8,
      comments: []
    }
  ],
  "day-2": [
    {
      id: "3",
      author: "Dave_Master",
      language: "Python",
      code: `a = int(input())
b = int(input())
print(a + b)`,
      explanation: "Read two integers from input and print their sum. Using int() to convert string input to integers.",
      timestamp: "1 day ago",
      votes: 15,
      comments: [
        {
          id: "3-1",
          author: "Eve_Learner",
          content: "Thanks for the explanation! I was confused about the int() conversion.",
          timestamp: "1 day ago"
        }
      ]
    }
  ],
  "day-5": [
    {
      id: "4",
      author: "Frank_Expert",
      language: "Python",
      code: `def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    
    return fib

n = int(input())
result = fibonacci(n)
print(", ".join(map(str, result)))`,
      explanation: "Iterative approach to generate Fibonacci sequence. More efficient than recursive solution for larger values of n.",
      timestamp: "2 days ago",
      votes: 23,
      comments: [
        {
          id: "4-1",
          author: "Grace_Student",
          content: "Why is iterative better than recursive here?",
          timestamp: "2 days ago"
        },
        {
          id: "4-2",
          author: "Frank_Expert",
          content: "Recursive approach has exponential time complexity due to redundant calculations, while iterative is O(n).",
          timestamp: "2 days ago"
        }
      ]
    }
  ]
};

const puzzleTitles = {
  "day-1": "Hello World",
  "day-2": "Sum of Two Numbers",
  "day-5": "Fibonacci Sequence"
};

export default function SolutionsPage() {
  const params = useParams();
  const language = params.language as string;
  const puzzleId = params.puzzleId as string;
  
  const solutions = solutionsData[puzzleId as keyof typeof solutionsData] || [];
  const puzzleTitle = puzzleTitles[puzzleId as keyof typeof puzzleTitles] || "Unknown Puzzle";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/languages/${language}/${puzzleId}`} className="btn btn-ghost btn-sm mb-4">
          ← Back to Problem
        </Link>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Solutions - {puzzleTitle}</h1>
            <p className="text-base-content/70">{solutions.length} solution{solutions.length !== 1 ? "s" : ""} submitted</p>
          </div>
          
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline">
              Sort by ▼
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Most Votes</a></li>
              <li><a>Newest First</a></li>
              <li><a>Oldest First</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl">
        {solutions.length > 0 ? (
          solutions.map((solution) => (
            <SolutionPost key={solution.id} solution={solution} />
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">No Solutions Yet</h3>
            <p className="text-base-content/70 mb-6">Be the first to submit a solution for this puzzle!</p>
            <Link href={`/languages/${language}/${puzzleId}`} className="btn btn-primary">
              Submit First Solution
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}