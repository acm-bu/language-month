"use server"

import { getSessionFromCookie } from "@/server/cookie";
import { getDbFromEnv } from "@/server/db";
import { userToPublic } from "@/server/db/auth";
import { ActionResponse, clientErr, ok } from ".";
import { PublicUser } from "@/server/db/schema";

export async function whoami(): ActionResponse<PublicUser & { email: string}> {
  const db = getDbFromEnv();
  const session = await getSessionFromCookie(db);

  if (!session) {
    return clientErr("Not authenticated");
  }

  const user = userToPublic(session.user);
  return ok({ ...user, email: session.user.email });
}
