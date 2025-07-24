import { cookies } from "next/headers";
import type { Session } from "./db/schema";
import { Database } from "./db";
import { findUserBySession } from "./db/auth";


export async function setSessionCookie(session: Session) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "session",
    value: session.token,
    httpOnly: true,
    expires: session.expiresAt,
  });
}

export async function getSessionFromCookie(db: Database) {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return null;
  }

  const join = await findUserBySession(db, sessionId);

  if (!join) {
    return null;
  }

  return join;
}
