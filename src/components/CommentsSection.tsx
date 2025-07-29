import { ExpandedComment } from "@/server/db/comments";
import Comment from "./Comment";

interface CommentsSectionProps {
  comments: ExpandedComment[];
  title?: string;
}

export default function CommentsSection({ comments, title = "Comments" }: CommentsSectionProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">{title}</h2>
        
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-base-content/60">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}