
import { createClient } from "@libsql/client";
import { AppConfig, readConfigFromEnv } from "../config";
import { drizzle } from "drizzle-orm/libsql";

export function getDb(config: AppConfig) {
  const client = config.dbType === "remote" ? createClient({
    url: config.dbPath,
    authToken: config.dbToken,
  }) : createClient({
    url: `file:${config.dbPath}`,
  });

  return drizzle(client);
}

export type Database = ReturnType<typeof getDb>;

export function getDbFromEnv() {
  const config = readConfigFromEnv();
  return getDb(config);
}
