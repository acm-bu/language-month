import Link from "next/link";

interface LockedScreenProps {
  backToCalendarHref: string;
}

export default function LockedScreen({ backToCalendarHref }: LockedScreenProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="card bg-base-200 shadow-xl max-w-md w-full">
          <div className="card-body text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="card-title text-2xl justify-center mb-4">
              Content Locked
            </h2>
            <p className="text-base-content/80 mb-6">
              This content is locked because you have not progressed to it yet. 
              Complete previous puzzles to unlock this page.
            </p>
            <div className="card-actions justify-center">
              <Link 
                href={backToCalendarHref}
                className="btn btn-primary"
              >
                Back to Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}