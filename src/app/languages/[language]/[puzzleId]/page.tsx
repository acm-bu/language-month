import Link from "next/link";
import { notFound } from "next/navigation";
import PuzzleDescription from "@/components/PuzzleDescription";
import { findCourseAndPuzzle } from "@/server/languages";
import SubmitButton from "@/components/SubmitButton";
import NewPostForm from "@/components/NewPostForm";

export default async function PuzzlePage({ params }: { params: Promise<{ language: string, puzzleId: string}> }) {
  const p = await params;
  const language = p.language;
  const puzzleId = p.puzzleId;

  const found = findCourseAndPuzzle(language, puzzleId);
  if (!found) {
    notFound();
  }
  const { puzzle } = found;

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
            <Link
              href={`/languages/${language}/${puzzleId}/solutions`}
              className="btn btn-outline"
            >
              View Solutions
            </Link>
            <SubmitButton title={puzzle.title}/>
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
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <NewPostForm />

                <div className="space-y-4">
                  {/* TODO - list forum posts */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
