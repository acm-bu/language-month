import { getDbFromEnv } from "@/server/db";
import { forceAuthenticated } from "@/server/db/auth";
import { redirect } from "next/navigation";

export async function GET() {
  const db = getDbFromEnv();
  const { user } = await forceAuthenticated(db);

  redirect(`/profiles/${user.id}`);
}
