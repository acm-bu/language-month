import { and, eq, like } from "drizzle-orm";
import { Comment, commentsTable, PublicUser, User, usersTable } from "./schema";
import type { Database } from ".";
import type { Flatten } from "@/utils";

export type ExpandedComment = Flatten<Omit<Comment, "author"> & { author: PublicUser }>;

export async function getCommentsForSolution(db: Database, solutionId: string) {
  const comments = await db.select()
    .from(commentsTable)
    .where(and(
      eq(commentsTable.replyTo, solutionId),
      eq(commentsTable.replyType, "solution")
    ))
    .innerJoin(usersTable, eq(usersTable.id, commentsTable.author))
    .orderBy(commentsTable.timestamp);

  return comments.map(({ user, comments }) => {
    return {
      ...comments,
      author: {
        id: user.id,
        name: user.name,
        image: user.image,
      }

    }
  });
}

export async function getCommentsForPuzzle(db: Database, puzzleId: string) {
  const comments = await db.select()
    .from(commentsTable)
    .where(and(
      eq(commentsTable.replyTo, puzzleId),
      eq(commentsTable.replyType, "puzzle")
    ))
    .innerJoin(usersTable, eq(usersTable.id, commentsTable.author))
    .orderBy(commentsTable.timestamp);

  return comments.map(({ user, comments }) => {
    return {
      ...comments,
      author: {
        id: user.id,
        name: user.name,
        image: user.image,
      }

    }
  })
}

export async function getCommentsForComment(db: Database, commentId: string) {
  const comments = await db.select()
    .from(commentsTable)
    .where(and(
      eq(commentsTable.replyTo, commentId),
      eq(commentsTable.replyType, "comment")
    ))
    .innerJoin(usersTable, eq(usersTable.id, commentsTable.author))
    .orderBy(commentsTable.timestamp);

  return comments.map(({ user, comments }) => {
    return {
      ...comments,
      author: {
        id: user.id,
        name: user.name,
        image: user.image,
      }

    }
  })
}

export async function getAllNestedCommentsForComment(db: Database, commentId: string): Promise<ExpandedComment[]> {
  const parentComment = await db.select()
    .from(commentsTable)
    .where(eq(commentsTable.id, commentId))
    .limit(1);

  if (parentComment.length === 0) {
    return [];
  }

  const commentPath = parentComment[0].path || commentId;
  
  const comments = await db.select()
    .from(commentsTable)
    .where(like(commentsTable.path, `${commentPath}/%`))
    .innerJoin(usersTable, eq(commentsTable.author, usersTable.id))
    .orderBy(commentsTable.depth, commentsTable.timestamp);

  return comments.map(({ user, comments }) => {
    return {
      ...comments,
      author: {
        id: user.id,
        name: user.name,
        image: user.image,
      }

    }
  })
}

export async function createComment(db: Database, comment: {
  id: string;
  replyTo: string;
  replyType: "solution" | "comment" | "puzzle";
  content: string;
  author: string;
  language: string;
}): Promise<Comment> {
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

  const newComments = await db.insert(commentsTable).values({
    ...comment,
    depth,
    path,
    timestamp: new Date(),
    score: 0,
  })
  .returning()

  return newComments[0]!;
}
