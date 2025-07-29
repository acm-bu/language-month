

export interface AppConfig {
  dbType: "local" | "remote";
  dbPath: string;
  dbToken: string | undefined;
  jwtKey: string;
  githubClientId: string;
  githubClientSecret: string;
}



export function readConfigFromEnv(): AppConfig {
  const clientId = process.env.LANGMONTH_GITHUB_ID;
  const clientSecret = process.env.LANGMONTH_GITHUB_SECRET;

  if (clientId === undefined) {
    throw new Error("No LANGMONTH_GITHUB_ID provided");
  }

  if (clientSecret === undefined) {
    throw new Error("No LANGMONTH_GITHUB_SECRET provided");
  }

  return {
    dbType: process.env.LANGMONTH_DB_TYPE === "remote" ? "remote" : "local",
    dbPath: process.env.LANGMONTH_DB_PATH ?? "localdb/db.sqlite",
    dbToken: process.env.LANGMONTH_DB_TOKEN,
    jwtKey: process.env.LANGMONTH_JWT_KEY ?? "a-string-secret-at-least-256-bits-long",
    githubClientId: clientId,
    githubClientSecret: clientSecret,
  }
}
