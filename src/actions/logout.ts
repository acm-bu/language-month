"use server"

import { removeSessionCookie } from "@/server/cookie";
import { getDbFromEnv } from "@/server/db"
import { deleteSession, forceAuthenticated } from "@/server/db/auth";
import { redirect } from "next/navigation";


export async function logout() {
  const db = getDbFromEnv();
  const { session } = await forceAuthenticated(db);

  await deleteSession(db, session.token);
  await removeSessionCookie();

  redirect("/");
}
