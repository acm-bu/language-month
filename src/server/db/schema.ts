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
  timestamp: int({ mode: "timestamp" }).notNull().default(new Date()),

  language: text().notNull(),
  puzzleId: text().notNull(),
});

export type Solution = InferSelectModel<typeof solutionsTable>;
export type ShortenedSolution = Pick<Solution, "language" | "puzzleId" | "timestamp" | "id" | "userId">

export const commentsTable = sqliteTable("comments", {
  id: text().notNull().unique().primaryKey(),
  replyTo: text().notNull(),
  replyType: text().$type<"solution" | "comment" | "puzzle">().default("comment"),
  content: text({ length: 100000 }).notNull(),
  author: text().notNull().references(() => usersTable.id),
  timestamp: int({ mode: "timestamp" }).notNull().default(new Date()),
  score: int().default(0).notNull(),
  language: text().notNull(),
  depth: int().notNull().default(0),
  path: text(),
});

export type Comment = InferSelectModel<typeof commentsTable>;

export const solutionVotes = sqliteTable("solution_votes", {
  userId: text().notNull().references(() => usersTable.id),
  solutionId: text().notNull().references(() => solutionsTable.id),
  positive: int({ mode: "boolean" }).notNull().default(false),
});

export type SolutionVote = InferSelectModel<typeof solutionVotes>;


export const commentVotes = sqliteTable("comment_votes", {
  userId: text().notNull().references(() => usersTable.id),
  commentId: text().notNull().references(() => commentsTable.id),
  positive: int({ mode: "boolean" }).notNull().default(false),
});

export type CommentVote = InferSelectModel<typeof commentVotes>;



