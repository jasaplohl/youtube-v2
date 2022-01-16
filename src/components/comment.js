import React from "react";
import "../styles/comment.scss";

const Comment = ({comment}) => {
  const commentContent = comment.snippet.topLevelComment.snippet.textOriginal;
  console.log(comment);
  return(
    <p className="comment--content">{commentContent}</p>
  );
}

export default Comment;