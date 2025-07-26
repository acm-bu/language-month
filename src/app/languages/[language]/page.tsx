import { getDbFromEnv } from "@/server/db";
import { forceAuthenticated } from "@/server/db/auth";
import { getAllUserSolutions } from "@/server/db/solutions";
// Claude: please use these getStringDay and getStringWeekday functions that take in a date
// argument and return what you'd expect
import { findCourse, getStringMonth, getStringWeekday } from "@/server/languages";
import Link from "next/link";
import { notFound } from "next/navigation";

interface LanguagePageProps {
  params: Promise<{ language: string }>;
}


export default async function LanguagePage({ params }: LanguagePageProps) {
  const db = getDbFromEnv();
  const { user } = await forceAuthenticated(db);
  const { language } = await params;

  const course = findCourse(language)
  const solutions = getAllUserSolutions(db, user.id, language);
  
  if (!course) {
    notFound();
  }

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/languages" className="btn btn-ghost btn-sm mb-4">
          ← Back to Languages
        </Link>
        <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
        <p className="text-lg opacity-70 mb-2">{getStringMonth(course.dateOpen)} - {course.dateOpen.getUTCFullYear()}</p>
        <p className="text-base-content/80">{course.description}</p>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Daily Puzzles</h2>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* OLD OUTDATED CODE -- SIMILAR STYLE BUT UPDATE WITH NEW STUFF */}
            {calendarData.map((week, weekIndex) => 
              week.map((day, dayIndex) => (
                <div key={`${weekIndex}-${dayIndex}`} className="aspect-square">
                  {day ? (
                    day.hasPuzzle ? (
                      <Link 
                        href={`/languages/${language}/${day.puzzleId}`}
                        className={`btn btn-square w-full h-full text-lg ${
                          day.isCompleted 
                            ? "btn-success" 
                            : "btn-primary"
                        }`}
                      >
                        {day.day}
                      </Link>
                    ) : (
                      <div className="btn btn-square w-full h-full text-lg btn-disabled opacity-30">
                        {day.day}
                      </div>
                    )
                  ) : (
                    <div className="w-full h-full"></div>
                  )}
                </div>
              ))
            )}
            {/* END OLD CODE */}
          </div>

          <div className="mt-6 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span>Available Puzzle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-success rounded"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-base-300 rounded"></div>
              <span>No Puzzle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
