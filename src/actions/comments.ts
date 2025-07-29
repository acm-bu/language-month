"use server";
import { getDbFromEnv } from "@/server/db";
import { forceAuthenticated } from "@/server/db/auth";
import { createComment, getCommentsForComment, getAllNestedCommentsForComment } from "@/server/db/comments";

export async function postComment(comment: {
  id: string,
  replyTo: string,
  replyType: "solution" | "comment" | "puzzle",
  content: string,
  language: string,
}) {
  const db = getDbFromEnv();
  const { user } = await forceAuthenticated(db);

  const newComment = await createComment(db,  {
    author: user.id,
    ...comment ,
  });

  return newComment;
}

export async function getCommentReplies(commentId: string) {
  const db = getDbFromEnv();
  const replies = await getCommentsForComment(db, commentId);
  return replies;
}

export async function getFullCommentThread(commentId: string) {
  const db = getDbFromEnv();
  const allComments = await getAllNestedCommentsForComment(db, commentId);
  return allComments;
}
