import { InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const usersTable = sqliteTable("users", {
  id: text().unique().primaryKey().notNull(),
  email: text().unique().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  hashedPassword: text().notNull(),
  verified: int({ mode: "boolean" }).notNull().default(true),
  bio: text(),
});

export type User = InferSelectModel<typeof usersTable>;
export type PublicUser = Omit<User, "hashedPassword" | "email" | "verified">;


export const sessionsTable = sqliteTable("sessions", {
  token: text().notNull().primaryKey().unique(),
  expiresAt: int({ mode: "timestamp_ms" }).notNull(),
  userId: text().notNull().references(() => usersTable.id)
});

export type Session = InferSelectModel<typeof sessionsTable>;

export const resetTable = sqliteTable("resets", {
  id: text().notNull().unique().primaryKey(),
  username: text().notNull().references(() => usersTable.id),
  expiresAt: int({ mode: "timestamp_ms" }).notNull(),
  key: text().notNull(),
});
export type ResetToken = InferSelectModel<typeof resetTable>;
