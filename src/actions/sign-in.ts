"use server"

import { getDbFromEnv } from "@/server/db"
import { signIn } from "@/server/db/auth";

export async function signInWithEmail(email: string, password: string) {
  const db = getDbFromEnv();

  const session = await signIn(db, email, password);

  if (session === null) {
    return new Error("Failed to sign in: invalid email or password");
  }

  return session
}
