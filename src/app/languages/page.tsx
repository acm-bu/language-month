import Link from "next/link";

const allLanguages = [
  { 
    id: "typescript", 
    name: "TypeScript", 
    month: "July 2024", 
    description: "Learn type-safe JavaScript development",
    status: "current",
    startDate: "2024-07-01"
  },
  { 
    id: "python", 
    name: "Python", 
    month: "January 2024", 
    description: "Learn the basics of Python programming",
    status: "completed",
    startDate: "2024-01-01"
  },
  { 
    id: "javascript", 
    name: "JavaScript", 
    month: "February 2024", 
    description: "Master modern JavaScript and ES6+",
    status: "completed",
    startDate: "2024-02-01"
  },
  { 
    id: "rust", 
    name: "Rust", 
    month: "March 2024", 
    description: "Explore systems programming with Rust",
    status: "completed",
    startDate: "2024-03-01"
  },
  { 
    id: "go", 
    name: "Go", 
    month: "April 2024", 
    description: "Build scalable applications with Go",
    status: "completed",
    startDate: "2024-04-01"
  },
  { 
    id: "kotlin", 
    name: "Kotlin", 
    month: "May 2024", 
    description: "Modern Android development with Kotlin",
    status: "completed",
    startDate: "2024-05-01"
  },
  { 
    id: "swift", 
    name: "Swift", 
    month: "June 2024", 
    description: "iOS development with Swift",
    status: "completed",
    startDate: "2024-06-01"
  },
];

export default function LanguagesPage() {
  const currentLanguage = allLanguages.find(lang => lang.status === "current");
  const pastLanguages = allLanguages.filter(lang => lang.status === "completed");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Language Months</h1>

      {currentLanguage && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-primary">Current Language</h2>
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="card-title text-2xl">{currentLanguage.name}</h3>
                  <p className="text-primary-content/80 mb-2">{currentLanguage.month}</p>
                  <p className="mb-4">{currentLanguage.description}</p>
                </div>
                <div className="badge badge-secondary">ACTIVE</div>
              </div>
              <div className="card-actions justify-end">
                <Link href={`/languages/${currentLanguage.id}`} className="btn btn-secondary">
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Past Language Months</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastLanguages.map((language) => (
            <div key={language.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="card-title">{language.name}</h3>
                  <div className="badge badge-outline">COMPLETED</div>
                </div>
                <p className="text-sm opacity-70 mb-2">{language.month}</p>
                <p className="mb-4">{language.description}</p>
                <div className="card-actions justify-end">
                  <Link href={`/languages/${language.id}`} className="btn btn-primary btn-sm">
                    Try It Out
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}