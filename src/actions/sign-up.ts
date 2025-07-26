"use server"

import { setSessionCookie } from "@/server/cookie";
import { getDbFromEnv } from "@/server/db";
import { createUser, signIn } from "@/server/db/auth";
import { redirect } from "next/navigation";
import { ActionResponse, clientErr } from ".";


export async function signUp(email: string, firstName: string, lastName: string, password: string): ActionResponse<undefined> {
  const emailValid = validateEmail(email);
  const passwordValid = validatePassword(password);
  if (typeof emailValid === "string") {
    return clientErr(`Error signing up: ${emailValid}`);
  }

  if (typeof passwordValid === "string") {
    return clientErr(`Error signing up: ${passwordValid}`);
  }

  const db = getDbFromEnv();

  await createUser(db, email, firstName, lastName, password);
  const session = await signIn(db, email, password);
  if (!session) {
    throw new Error("Sever error: failed to create session after sign up");
  }

  await setSessionCookie(session);
  redirect("/");
}

function validateEmail(email: string): string | null {
  if (typeof email !== 'string') return "Email must be a string";
  if (email.length > 254) return "Email must be no more than 254 characters";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Email format is invalid";
  return null;
}

function validatePassword(password: string): string | null {
  if (typeof password !== 'string') return "Password must be a string";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.length > 128) return "Password must be no more than 128 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/\d/.test(password)) return "Password must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character";
  return null;
}
