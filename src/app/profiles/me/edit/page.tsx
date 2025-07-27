import { getDbFromEnv } from "@/server/db";
import { forceAuthenticated } from "@/server/db/auth";
import EditProfileForm from "@/components/EditProfileForm";

export default async function EditProfilePage() {
  const db = getDbFromEnv();
  const { user } = await forceAuthenticated(db);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-base-content/70">Update your personal information</p>
      </div>

      <div className="mb-6 p-4 bg-base-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Current Profile</h2>
        <div className="space-y-1">
          <p><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Bio:</span> {user.bio || "No bio provided"}</p>
        </div>
      </div>

      <EditProfileForm user={user} />
    </div>
  );
}
