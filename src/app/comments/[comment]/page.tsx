import { notFound } from "next/navigation";
import { getDbFromEnv } from "@/server/db";
import { forceAuthenticated } from "@/server/db/auth";
import { getFullCommentThread } from "@/actions/comments";
import CommentsSection from "@/components/CommentsSection";
import { commentsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

interface CommentThreadPageProps {
  params: Promise<{
    comment: string;
  }>;
}

export default async function CommentThreadPage({ params }: CommentThreadPageProps) {
  const p = await params;
  const { comment: commentId } = p;

  const db = getDbFromEnv();
  await forceAuthenticated(db);

  // Get the root comment to understand context
  const rootComment = await db.select()
    .from(commentsTable)
    .where(eq(commentsTable.id, commentId))
    .limit(1);

  if (rootComment.length === 0) {
    notFound();
  }

  const comment = rootComment[0];

  // Get all nested comments for this thread
  const allComments = await getFullCommentThread(commentId);

  // Find the original comment this thread belongs to
  let originalContext = "";
  let backLink = "/";
  
  if (comment.replyType === "puzzle") {
    originalContext = `Discussion for puzzle: ${comment.replyTo}`;
    // Extract language from comment if available, fallback to general link
    backLink = comment.language ? `/languages/${comment.language}/${comment.replyTo}` : "/";
  } else if (comment.replyType === "solution") {
    originalContext = `Comments for solution: ${comment.replyTo}`;
    // Solutions pages would need the full path reconstruction
    backLink = "/";
  } else if (comment.replyType === "comment") {
    originalContext = `Reply thread`;
    backLink = `/comments/${comment.replyTo}`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={backLink} className="btn btn-ghost btn-sm mb-4">
          ← Back to original discussion
        </Link>

        <div className="mb-4">
          <h1 className="text-4xl font-bold mb-2">Comment Thread</h1>
          <p className="text-lg text-base-content/70">{originalContext}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <CommentsSection
          comments={allComments}
          replyTo={commentId}
          replyType="comment"
          language={comment.language}
          title="Full Thread"
          maxDepth={10}
        />
      </div>
    </div>
  );
}
