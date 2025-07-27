import { eq } from "drizzle-orm";
import { Database } from ".";
import { EditableProfile, usersTable, type User } from "./schema";

export async function getUserFromId(db: Database, userId: string): Promise<User | null> {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  return users[0] ?? null;
}

export async function updateProfile(db: Database, userId: string, profile: EditableProfile): Promise<User | null> {
  const users = await db
    .update(usersTable)
    .set({
      firstName: profile.firstName,
      lastName: profile.lastName,
      bio: profile.bio,
    })
    .where(eq(usersTable.id, userId))
    .returning();
  
  return users[0] ?? null;
}
