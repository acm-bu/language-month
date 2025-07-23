import { defineConfig } from "drizzle-kit";
import path from "path";

const root = path.resolve(__dirname, "..");

export default defineConfig({
  schema: path.join(root, "src/server/db/schema.ts"),
  dialect: "turso",
  out: path.join(root, "drizzle/local"),
  dbCredentials: {
    url: path.join(root, "localdb/db.sqlite")
  }
})
