import { defineConfig } from "drizzle-kit";
import path from "path";

const root = path.resolve(__dirname, "..");

export default defineConfig({
  schema: path.join(root, "src/server/db/schema.ts"),
  dialect: "turso",
  out: path.join(root, "drizzle/remote"),
  dbCredentials: {
    url: process.env.LANGMONTH_DB_PATH!,
    authToken: process.env.LANGMONTH_DB_TOKEN!,
  }
})
