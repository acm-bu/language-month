import { getDbFromEnv } from "@/server/db";
import { forceAuthenticated } from "@/server/db/auth";
import { getAllUserSolutions, getLanguageProgress } from "@/server/db/solutions";
import { findCourse, getStringMonth, getStringWeekday } from "@/server/languages";
import Link from "next/link";
import { notFound } from "next/navigation";
import LanguageProgressBar from "@/components/LanguageProgressBar";

interface LanguagePageProps {
  params: Promise<{ language: string }>;
}


export default async function LanguagePage({ params }: LanguagePageProps) {
  const db = getDbFromEnv();
  const { user } = await forceAuthenticated(db);
  const { language } = await params;

  const course = findCourse(language)
  
  if (!course) {
    notFound();
  }

  const solutions = await getAllUserSolutions(db, user.id, language);
  const solvedPuzzleIds = new Set(solutions.map(s => s.puzzleId));
  const progress = await getLanguageProgress(db, user.id, language);

  // Color configuration
  const completedColor = "btn-neutral";
  const availableColor = "btn-primary";
  const noPuzzleColor = "";
  const completedBgColor = "bg-neutral";
  const availableBgColor = "bg-primary";
  const noPuzzleBgColor = "";

  const firstDate = new Date(course.dateOpen);
  const year = firstDate.getUTCFullYear();
  const month = firstDate.getUTCMonth();
  
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
  
  const startingDayOfWeek = (firstDayOfMonth.getUTCDay() + 6) % 7;
  
  const calendarData: (null | {
    day: number;
    hasPuzzle: boolean;
    puzzleId?: string;
    isCompleted: boolean;
    isNextMonth?: boolean;
  })[] = [];
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarData.push(null);
  }
  
  for (let day = 1; day <= lastDayOfMonth.getUTCDate(); day++) {
    // const currentDate = new Date(Date.UTC(year, month, day));
    const puzzle = course.puzzles.find(p => 
      p.date.getUTCDate() === day && 
      p.date.getUTCMonth() === month && 
      p.date.getUTCFullYear() === year
    );
    
    calendarData.push({
      day,
      hasPuzzle: !!puzzle,
      puzzleId: puzzle?.id,
      isCompleted: puzzle ? solvedPuzzleIds.has(puzzle.id) : false,
      isNextMonth: false
    });
  }

  // Fill remaining calendar grid with first week of next month if needed
  const totalCells = calendarData.length;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  
  for (let day = 1; day <= remainingCells; day++) {
    // const nextMonthDate = new Date(Date.UTC(year, month + 1, day));
    const puzzle = course.puzzles.find(p => 
      p.date.getUTCDate() === day && 
      p.date.getUTCMonth() === month + 1 && 
      p.date.getUTCFullYear() === year
    );
    
    calendarData.push({
      day,
      hasPuzzle: !!puzzle,
      puzzleId: puzzle?.id,
      isCompleted: puzzle ? solvedPuzzleIds.has(puzzle.id) : false,
      isNextMonth: true
    });
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
        <p className="text-base-content/80 mb-4">{course.description}</p>
        <div className="max-w-md">
          <LanguageProgressBar completed={progress.completed} total={progress.total} />
        </div>
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
            {calendarData.map((day, index) => (
              <div key={index} className="aspect-square">
                {day ? (
                  day.hasPuzzle ? (
                    <Link 
                      href={`/languages/${language}/${day.puzzleId}`}
                      className={`btn btn-square w-full h-full text-lg ${
                        day.isCompleted 
                          ? completedColor 
                          : availableColor
                      } ${day.isNextMonth ? "opacity-60" : ""}`}
                    >
                      {day.day}
                    </Link>
                  ) : (
                    <div className={`btn btn-square w-full h-full text-lg ${noPuzzleColor} ${day.isNextMonth ? "opacity-20" : "opacity-30"}`}>
                      {day.day}
                    </div>
                  )
                ) : (
                  <div className="w-full h-full"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 ${availableBgColor} rounded`}></div>
              <span>Available Puzzle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 ${completedBgColor} rounded`}></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 ${noPuzzleBgColor} rounded`}></div>
              <span>No Puzzle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
