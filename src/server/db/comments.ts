import { and, eq, like } from "drizzle-orm";
import { commentsTable } from "./schema";
import type { Database } from ".";

export function getCommentsForSolution(db: Database, solutionId: string) {
  return db.select()
    .from(commentsTable)
    .where(and(
      eq(commentsTable.replyTo, solutionId),
      eq(commentsTable.replyType, "solution")
    ))
    .orderBy(commentsTable.timestamp);
}

export function getCommentsForPuzzle(db: Database, puzzleId: string) {
  return db.select()
    .from(commentsTable)
    .where(and(
      eq(commentsTable.replyTo, puzzleId),
      eq(commentsTable.replyType, "puzzle")
    ))
    .orderBy(commentsTable.timestamp);
}

export function getCommentsForComment(db: Database, commentId: string) {
  return db.select()
    .from(commentsTable)
    .where(and(
      eq(commentsTable.replyTo, commentId),
      eq(commentsTable.replyType, "comment")
    ))
    .orderBy(commentsTable.timestamp);
}

export async function getAllNestedCommentsForComment(db: Database, commentId: string) {
  const parentComment = await db.select()
    .from(commentsTable)
    .where(eq(commentsTable.id, commentId))
    .limit(1);

  if (parentComment.length === 0) {
    return [];
  }

  const commentPath = parentComment[0].path || commentId;
  
  return db.select()
    .from(commentsTable)
    .where(like(commentsTable.path, `${commentPath}/%`))
    .orderBy(commentsTable.depth, commentsTable.timestamp);
}

export async function createComment(db: Database, comment: {
  id: string;
  replyTo: string;
  replyType: "solution" | "comment" | "puzzle";
  content: string;
  author: string;
  language: string;
}) {
  let depth = 0;
  let path = comment.id;

  if (comment.replyType === "comment") {
    const parentComment = await db.select()
      .from(commentsTable)
      .where(eq(commentsTable.id, comment.replyTo))
      .limit(1);

    if (parentComment.length > 0) {
      depth = parentComment[0].depth + 1;
      path = parentComment[0].path ? `${parentComment[0].path}/${comment.id}` : `${comment.replyTo}/${comment.id}`;
    }
  }

  return db.insert(commentsTable).values({
    ...comment,
    depth,
    path,
    timestamp: new Date(),
    score: 0,
  });
}
