import { Database } from ".";
import { commentsTable, usersTable } from "./schema";
import { and, eq } from "drizzle-orm";
import type { Comment, User } from "./schema";
import type { Flatten } from "@/utils";

// in general, we always do an inner join with the author of the comment
// TODO - support upvoting and downvoting comments
export type ContextualizedComment = Flatten<Comment & { author: User }>

export async function getRootComments(db: Database, language: string, puzzle: string, limit: number = 50, page: number = 0) {
  const comments = await db
    .select()
    .from(commentsTable)
    .where(and(
      eq(commentsTable.language, language),
      eq(commentsTable.puzzleId, puzzle),
    ))
    .leftJoin(usersTable, eq(commentsTable.id, usersTable.id))
    .limit(limit)
    .offset(limit * page)
}

export async function getRepliesOfComment(db: Database, commentId: string) {

}
