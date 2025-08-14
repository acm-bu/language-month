import Link from "next/link";
import { notFound } from "next/navigation";
import { findCourseAndPuzzle } from "@/server/languages";
import { getSolutionById, hasSolved } from "@/server/db/solutions";
import { getDbFromEnv } from "@/server/db";
import { forceAuthenticated } from "@/server/db/auth";
import LockedScreen from "@/components/LockedScreen";
import { CommentsSection } from "@/components/CommentsSection";

interface SolutionPageProps {
  params: Promise<{
    language: string;
    puzzleId: string;
    solution: string;
  }>;
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const p = await params;
  const { language, puzzleId, solution: solutionId } = p;

  const db = getDbFromEnv();
  const auth = await forceAuthenticated(db);
  const solved = await hasSolved(db, auth.user.id, language, puzzleId);

  if (!solved) {
    <LockedScreen
      backToCalendarHref={`/languages/${p.language}`}
    />
  }

  const found = findCourseAndPuzzle(language, puzzleId);
  if (!found) {
    notFound();
  }
  const { puzzle } = found;

  const solutionData = await getSolutionById(db, solutionId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/languages/${language}/${puzzleId}/solutions`}
          className="btn btn-ghost btn-sm mb-4"
        >
          Back to Solutions
        </Link>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{puzzle.title}</h1>
            <p className="text-lg text-base-content/70">
              Solution by {solutionData.user.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/languages/${language}/${puzzleId}`}
              className="btn btn-outline"
            >
              View Problem
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Solution</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Code</h3>
              <div className="mockup-code">
                <pre><code>{solutionData.solution.code}</code></pre>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Explanation</h3>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{solutionData.solution.explanation}</p>
              </div>
            </div>

            <div className="text-sm text-base-content/60">
              <p>
                Submitted on {new Date(solutionData.solution.timestamp).toLocaleDateString()}
                at {new Date(solutionData.solution.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        <CommentsSection />
      </div>
    </div>
  );
}
