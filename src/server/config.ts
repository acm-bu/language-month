

export interface AppConfig {
  dbType: "local" | "remote";
  dbPath: string;
  dbToken: string | undefined;
  githubClientId: string;
  githubClientSecret: string;
}



export function readConfigFromEnv(): AppConfig {
  const clientId = assertFromEnv("LANGMONTH_GITHUB_ID")
  const clientSecret = assertFromEnv("LANGMONTH_GITHUB_SECRET");

  // we don't actually need these
  assertFromEnv("NEXTAUTH_URL");
  assertFromEnv("NEXTAUTH_SECRET");

  return {
    dbType: process.env.LANGMONTH_DB_TYPE === "remote" ? "remote" : "local",
    dbPath: process.env.LANGMONTH_DB_PATH ?? "localdb/db.sqlite",
    dbToken: process.env.LANGMONTH_DB_TOKEN,
    githubClientId: clientId,
    githubClientSecret: clientSecret,
  }
}

export function assertFromEnv(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Couldn't find ${key} in env`);
  }

  return value;
}
