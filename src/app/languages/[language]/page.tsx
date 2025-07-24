import Link from "next/link";

interface LanguagePageProps {
  params: Promise<{ language: string }>;
}

const generateCalendarData = (language: string) => {
  const weeks = [];
  const daysInMonth = 31;
  const startDayOfWeek = 1; // Monday
  
  // Puzzle days: Monday, Tuesday, Thursday, Friday (1, 2, 4, 5)
  const puzzleDays = [1, 2, 4, 5];
  
  let currentDay = 1;
  
  for (let week = 0; week < 5; week++) {
    const weekDays = [];
    
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      if (week === 0 && dayOfWeek < startDayOfWeek) {
        weekDays.push(null);
      } else if (currentDay > daysInMonth) {
        weekDays.push(null);
      } else {
        const hasPuzzle = puzzleDays.includes(dayOfWeek);
        weekDays.push({
          day: currentDay,
          hasPuzzle,
          puzzleId: hasPuzzle ? `day-${currentDay}` : null,
          isCompleted: Math.random() > 0.5, // Random completion status for demo
        });
        currentDay++;
      }
    }
    
    weeks.push(weekDays);
    
    if (currentDay > daysInMonth) break;
  }
  
  return weeks;
};

const languageInfo = {
  python: { name: "Python", month: "January 2024", description: "Learn the basics of Python programming" },
  javascript: { name: "JavaScript", month: "February 2024", description: "Master modern JavaScript and ES6+" },
  rust: { name: "Rust", month: "March 2024", description: "Explore systems programming with Rust" },
  go: { name: "Go", month: "April 2024", description: "Build scalable applications with Go" },
  typescript: { name: "TypeScript", month: "July 2024", description: "Learn type-safe JavaScript development" },
  kotlin: { name: "Kotlin", month: "May 2024", description: "Modern Android development with Kotlin" },
  swift: { name: "Swift", month: "June 2024", description: "iOS development with Swift" },
};

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { language } = await params;
  const info = languageInfo[language as keyof typeof languageInfo];
  
  if (!info) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Language Not Found</h1>
        <p className="mb-4">The language "{language}" is not available.</p>
        <Link href="/languages" className="btn btn-primary">
          Back to Languages
        </Link>
      </div>
    );
  }

  const calendarData = generateCalendarData(language);
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/languages" className="btn btn-ghost btn-sm mb-4">
          ← Back to Languages
        </Link>
        <h1 className="text-4xl font-bold mb-2">{info.name}</h1>
        <p className="text-lg opacity-70 mb-2">{info.month}</p>
        <p className="text-base-content/80">{info.description}</p>
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