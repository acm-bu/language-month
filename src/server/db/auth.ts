import { eq } from "drizzle-orm";
import { Database } from ".";
import type { PublicUser, Session, User } from "./schema";
import { sessionsTable, usersTable } from "./schema"
import { randomUUIDv7 } from "bun";
import { getSessionFromCookie } from "../cookie";
import { redirect } from "next/navigation";

export async function createUser(db: Database, email: string, firstName: string, lastName: string, password: string): Promise<User> {
  const hashedPassword = Bun.password.hashSync(password);
  const id = randomUUIDv7();

  const user = await db
    .insert(usersTable)
    .values({
      id,
      email,
      firstName,
      lastName,
      hashedPassword,
    })
    .returning();

  return user[0]!;
}

// we return null if something goes wrong so that we don't
// give the user a hint on if it was their email or password
// that was wrong
//
// this is to prevent attackers from just guessing emails
// to learn which ones are real and which ones are not
export async function signIn(db: Database, email: string, password: string): Promise<null | Session> {
  const user = await findUserByEmail(db, email);

  if (!user) {
    return null;
  }

  const verified = Bun.password.verifySync(password, user.hashedPassword);

  if (!verified) {
    return null;
  }

  const sessionId = randomUUIDv7();
  const expirationDate = new Date();
  expirationDate.setUTCMilliseconds(Date.now() + 1000 * 60 * 60 * 24 * 30);

  const session: Session = {
    token: sessionId,
    // expires after 30 days
    expiresAt: expirationDate,
    userId: user.id,
  }

  await db
    .insert(sessionsTable)
    .values(session)

  return session;
}

export async function deleteSession(db: Database, sessionId: string) {
  await db
    .delete(sessionsTable)
    .where(eq(sessionsTable.token, sessionId))
}


export async function findUserByEmail(db: Database, email: string): Promise<User | null> {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)

  return users[0] ?? null;
}

export async function findUserBySession(db: Database, sessionId: string): Promise<{ user: User, session: Session } | null> {
  const join = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.token, sessionId))
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .limit(1)

  if (join.length === 0) {
    return null;
  }

  return {
    session: join[0].sessions,
    user: join[0].users,
  }
}

export function userToPublic(user: User): PublicUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,

  }
}


export async function forceAuthenticated(db: Database, redirectTo?: string): Promise<{ user: User, session: Session }> {
  const join = await getSessionFromCookie(db);

  if (!join) {
    redirect(redirectTo ?? "/auth");
  }

  return join;
}
