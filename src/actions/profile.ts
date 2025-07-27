"use server"

import { getDbFromEnv } from "@/server/db";
import { forceAuthenticated } from "@/server/db/auth";
import { EditableProfile, PrivateUser } from "@/server/db/schema";
import { updateProfile } from "@/server/db/users";


export async function editProfile(p: EditableProfile): Promise<PrivateUser> {
  const db = getDbFromEnv();
  const { user } = await forceAuthenticated(db);

  const updatedUser = await updateProfile(db, user.id, p);

  if (!updatedUser) {
    throw new Error("There should be no possible way for this update to fail");
  }

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    bio: updatedUser.bio,
    verified: updatedUser.verified,
  };
}
