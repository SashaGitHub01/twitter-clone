import React from "react";
import { IComment } from "../../../types/IComment";
import Comment from "./Comment/Comment";

interface ICommentsListProps {
   comments: IComment[],
}

const CommentsList: React.FC<ICommentsListProps> = ({ comments }) => {
   return (
      <div className="comments-list">
         {comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
         ))}
      </div>
   )
}

export default CommentsList
