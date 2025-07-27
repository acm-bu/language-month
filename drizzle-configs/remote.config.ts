import { defineConfig } from "drizzle-kit";

console.log(process.env.LANGMONTH_DB_PATH);

export default defineConfig({
  schema: "src/server/db/schema.ts",
  dialect: "turso",
  out: "drizzle/remote",
  dbCredentials: {
    url: process.env.LANGMONTH_DB_PATH!,
    authToken: process.env.LANGMONTH_DB_TOKEN!,
  }
})
