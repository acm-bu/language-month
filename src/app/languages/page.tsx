import Link from "next/link";
import { findAllCourses, getStringMonth } from "@/server/languages";
import { getAllLanguagesProgress } from "@/server/db/solutions";
import { getDbFromEnv } from "@/server/db";
import LanguageProgressBar from "@/components/LanguageProgressBar";
import { forceAuthenticated } from "@/server/db/auth";
import { getSessionFromCookie } from "@/server/cookie";

export default async function LanguagesPage() {
  const courses = findAllCourses();
  const db = getDbFromEnv();
  const auth = await getSessionFromCookie(db);

  let progressData: Record<string, { completed: number, total: number }> = {};
  if (auth) {
    progressData = await getAllLanguagesProgress(db, auth.user.id);
  }

  const currentDate = new Date();
  const currentCourse = courses.find(course => course.dateOpen <= currentDate);
  const futureCourses = courses.filter(course => course.dateOpen > currentDate);
  const pastCourses = courses.filter(course => course.dateOpen < currentDate && course !== currentCourse);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Language Months</h1>

      {currentCourse && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-primary">Current Language</h2>
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="card-title text-2xl">{currentCourse.title}</h3>
                  <p className="text-primary-content/80 mb-2">{getStringMonth(currentCourse.dateOpen)} {currentCourse.dateOpen.getFullYear()}</p>
                  <p className="mb-4">{currentCourse.description}</p>
                  {auth && progressData[currentCourse.language] && (
                    <div className="mb-4">
                      <LanguageProgressBar
                        completed={progressData[currentCourse.language].completed}
                        total={progressData[currentCourse.language].total}
                      />
                    </div>
                  )}
                </div>
                <div className="badge badge-accent">ACTIVE</div>
              </div>
              <div className="card-actions justify-end">
                <Link href={`/languages/${currentCourse.language}`} className="btn btn-accent">
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {pastCourses.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Past Language Months</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastCourses.map((course) => (
              <div key={course.language} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title">{course.title}</h3>
                    <div className="badge badge-outline">COMPLETED</div>
                  </div>
                  <p className="text-sm opacity-70 mb-2">{getStringMonth(course.dateOpen)} {course.dateOpen.getFullYear()}</p>
                  <p className="mb-4">{course.description}</p>
                  {auth && progressData[course.language] && (
                    <div className="mb-4">
                      <LanguageProgressBar
                        completed={progressData[course.language].completed}
                        total={progressData[course.language].total}
                      />
                    </div>
                  )}
                  <div className="card-actions justify-end">
                    <Link href={`/languages/${course.language}`} className="btn btn-primary btn-sm">
                      Try It Out
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {futureCourses.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Upcoming Language Months</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureCourses.map((course) => (
              <div key={course.language} className="card bg-base-300 shadow-xl opacity-75">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title">{course.title}</h3>
                    <div className="badge badge-outline">COMING SOON</div>
                  </div>
                  <p className="text-sm opacity-70 mb-2">{getStringMonth(course.dateOpen)} {course.dateOpen.getFullYear()}</p>
                  <p className="mb-4">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
