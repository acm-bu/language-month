"use server"

import { getSessionFromCookie } from "@/server/cookie";
import { getDbFromEnv } from "@/server/db";
import { userToPublic } from "@/server/db/auth";

export async function whoami() {
  const db = getDbFromEnv();
  const session = await getSessionFromCookie(db);

  if (!session) {
    return null;
  }

  const user = userToPublic(session.user);
  return { ...user, email: session.user.email };
}
