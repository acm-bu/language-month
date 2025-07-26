import Link from "next/link";
import SolutionPost from "@/components/SolutionPost";
import { getDbFromEnv } from "@/server/db";
import { getSolutionsForProblem, hasSolved } from "@/server/db/solutions";
import { findCourseAndPuzzle } from "@/server/languages";
import { notFound } from "next/navigation";
import { forceAuthenticated } from "@/server/db/auth";
import LockedScreen from "@/components/LockedScreen";


export default async function SolutionsPage({ params }: { params: Promise<{ language: string; puzzleId: string }> }) {
  const { language, puzzleId } = await params;
  
  const db = getDbFromEnv();
  const solutionsData = await getSolutionsForProblem(db, language, puzzleId);
  const auth = await forceAuthenticated(db);

  const solved = await hasSolved(db, auth.user.id, language, puzzleId);

  if (!solved) {
    return (
      <LockedScreen
        backToCalendarHref={`/languages/${language}`}
      />
    )
  }
  
  const solutions = solutionsData.map(({ solution, user }) => ({
    id: solution.id,
    author: `${user.firstName} ${user.lastName}`,
    language: solution.language,
    code: solution.code,
    explanation: solution.explanation,
    timestamp: solution.timestamp.toISOString(),
    puzzleId: solution.puzzleId,
    votes: 0,
    comments: []
  }));
  const u = findCourseAndPuzzle(language, puzzleId);

  if (!u) {
    notFound();
  }
  const { puzzle } = u;
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/languages/${language}/${puzzleId}`} className="btn btn-ghost btn-sm mb-4">
          ← Back to Problem
        </Link>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Solutions - {puzzle.title}</h1>
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
