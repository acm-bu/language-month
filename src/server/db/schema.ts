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

export const solutionsTable = sqliteTable("solutions", {
  id: text().notNull().unique().primaryKey(),
  userId: text().notNull().references(() => usersTable.id),
  explanation: text().notNull(),
  code: text().notNull(),
  language: text().notNull(),
  timestamp: int({ mode: "timestamp" }).notNull().default(new Date()),
});

export type Solution = InferSelectModel<typeof solutionsTable>;

export const commentsTable = sqliteTable("comments", {
  id: text().notNull().unique().primaryKey(),
  replyTo: text(),
  content: text({ length: 100000 }).notNull(),
  author: text().notNull().references(() => usersTable.id),
  timestamp: int({ mode: "timestamp" }).notNull().default(new Date()),
});


export type Comment = InferSelectModel<typeof commentsTable>;
