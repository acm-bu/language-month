import Link from "next/link";
import { notFound } from "next/navigation";
import PuzzleDescription from "@/components/PuzzleDescription";
import { findCourseAndPuzzle } from "@/server/languages";
import SubmitButton from "@/components/SubmitButton";
import { getDbFromEnv } from "@/server/db";
import { getUserSolution, hasSolved, isProgressed } from "@/server/db/solutions";
import { forceAuthenticated } from "@/server/db/auth";
import LockedScreen from "@/components/LockedScreen";
import { CommentsSection } from "@/components/CommentsSection";

export default async function PuzzlePage({ params }: { params: Promise<{ language: string, puzzleId: string }> }) {
  const p = await params;
  const language = p.language;
  const puzzleId = p.puzzleId;

  const found = findCourseAndPuzzle(language, puzzleId);
  if (!found) {
    notFound();
  }
  const { puzzle } = found;

  const db = getDbFromEnv();
  const auth = await forceAuthenticated(db);

  // this is a bit more difficult to read, but it allows us to run these queries quicker
  const [
    existingSolution,
    solved,
    progressed,
  ] = await Promise.all([
    getUserSolution(db, auth.user.id, language, puzzleId),
    hasSolved(db, auth.user.id, language, puzzleId),
    isProgressed(db, auth.user.id, language, puzzleId),
  ]);

  if (!progressed) {
    return (
      <LockedScreen
        backToCalendarHref={`/languages/${language}`}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/languages/${language}`} className="btn btn-ghost btn-sm mb-4">
          ← Back to {language.charAt(0).toUpperCase() + language.slice(1)} Calendar
        </Link>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{puzzle.title}</h1>
          </div>
          <div className="flex gap-2">
            {solved ?
              (<Link
                href={`/languages/${language}/${puzzleId}/solutions`}
                className="btn btn-outline"
              >
                View Solutions
              </Link>) : <></>
            }
            <SubmitButton title={puzzle.title} language={language} puzzleId={puzzleId} existingSolution={existingSolution} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Problem Description</h2>
              <PuzzleDescription language={language} id={puzzleId} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="mt-8">
              <CommentsSection />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
