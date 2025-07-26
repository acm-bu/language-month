import { defineConfig } from "drizzle-kit";
import path from "path";


export default defineConfig({
  schema: "src/server/db/schema.ts",
  dialect: "turso",
  out: "drizzle/local",
  dbCredentials: {
    url: "localdb/db.sqlite",
  }
})
