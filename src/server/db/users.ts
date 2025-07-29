import { eq } from "drizzle-orm";
import { Database } from ".";
import { usersTable, type User } from "./schema";

export async function getUserFromId(db: Database, userId: string): Promise<User | null> {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  return users[0] ?? null;
}

