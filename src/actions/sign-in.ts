"use server"

import { getDbFromEnv } from "@/server/db"
import { signIn } from "@/server/db/auth";
import { redirect } from "next/navigation";
import { ActionResponse, clientErr } from ".";
import { setSessionCookie } from "@/server/cookie";

export async function signInWithEmail(email: string, password: string): ActionResponse {
  const db = getDbFromEnv();

  const session = await signIn(db, email, password);

  if (session === null) {
    return clientErr("Failed to sign in: invalid email or password");
  }

  await setSessionCookie(session);
  redirect("/")
}
