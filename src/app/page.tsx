import Link from "next/link";

const dummyPreviousMonths = [
  { id: "python-2024-01", name: "Python", month: "January 2024", description: "Learn the basics of Python programming" },
  { id: "javascript-2024-02", name: "JavaScript", month: "February 2024", description: "Master modern JavaScript and ES6+" },
  { id: "rust-2024-03", name: "Rust", month: "March 2024", description: "Explore systems programming with Rust" },
  { id: "go-2024-04", name: "Go", month: "April 2024", description: "Build scalable applications with Go" },
];

const currentLanguage = "TypeScript";
const nextEventDate = new Date("2024-08-01");

export default function Home() {
  const now = new Date();
  const isEventActive = now >= nextEventDate;
  const daysUntilEvent = Math.ceil((nextEventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen">
      <section className="hero min-h-screen bg-gradient-to-b from-primary/20 to-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-8">ACM Language Month</h1>
            
            {isEventActive ? (
              <div className="space-y-4">
                <p className="text-lg">Current Language: <span className="font-bold text-primary">{currentLanguage}</span></p>
                <Link href={`/languages/${currentLanguage.toLowerCase()}`} className="btn btn-primary btn-lg">
                  Start Learning {currentLanguage}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg">Next Language: <span className="font-bold text-primary">{currentLanguage}</span></p>
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Days Until</div>
                    <div className="stat-value text-primary">{daysUntilEvent}</div>
                    <div className="stat-desc">August 1st, 2024</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Previous Language Months</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyPreviousMonths.map((lang) => (
              <div key={lang.id} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{lang.name}</h3>
                  <p className="text-sm opacity-70">{lang.month}</p>
                  <p>{lang.description}</p>
                  <div className="card-actions justify-end">
                    <Link href={`/languages/${lang.name.toLowerCase()}`} className="btn btn-primary btn-sm">
                      Try It Out
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
