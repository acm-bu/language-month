import { getSessionFromCookie } from "@/server/cookie";
import { getDbFromEnv } from "@/server/db";
import { getUserFromId } from "@/server/db/users";
import { getAllLanguagesProgress } from "@/server/db/solutions";
import { notFound } from "next/navigation";
import Link from "next/link";
import LanguageProgressBar from "@/components/LanguageProgressBar";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const db = getDbFromEnv();
  const { id } = await params;

  const session = await getSessionFromCookie(db);
  
  // if we are looking at our own profile add a button to redirect
  // to the /profiles/me/edit
  const isSelfProfile = session?.user.id === id;

  const user = await getUserFromId(db, id);

  if (!user) {
    notFound();
  }

  const languageProgress = await getAllLanguagesProgress(db, id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-base-100 shadow-xl rounded-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              {user.firstName} {user.lastName}
            </h1>
            {user.bio && (
              <p className="text-base-content/70 mt-2 text-lg">{user.bio}</p>
            )}
          </div>
          {isSelfProfile && (
            <Link 
              href="/profiles/me/edit" 
              className="btn btn-primary"
            >
              Edit Profile
            </Link>
          )}
        </div>

        <div className="grid gap-8">
          <div className="bg-base-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">Net Score</h2>
            <div className="text-4xl font-bold text-primary">0</div>
          </div>

          <div className="bg-base-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Language Progress</h2>
            <div className="space-y-6">
              {Object.entries(languageProgress).map(([language, progress]) => (
                <div key={language} className="bg-base-100 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3 capitalize">{language}</h3>
                  <LanguageProgressBar 
                    completed={progress.completed} 
                    total={progress.total} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
