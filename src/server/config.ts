

export interface AppConfig {
  dbType: "local" | "remote";
  dbPath: string;
  dbToken: string | undefined;
  jwtKey: string;
}



export function readConfigFromEnv(): AppConfig {
  return {
    dbType: process.env.LANGMONTH_DB_TYPE === "remote" ? "remote" : "local",
    dbPath: process.env.LANGMONTH_DB_PATH ?? "localdb/db.sqlite",
    dbToken: process.env.LANGMONTH_DB_TOKEN,
    jwtKey: process.env.JWT_KEY ?? "a-string-secret-at-least-256-bits-long",

  }
}
