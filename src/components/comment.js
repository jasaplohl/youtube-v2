import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import moment from "moment";

import "../styles/comment.scss";

const Comment = ({comment}) => {
  const thumbnailURL = comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
  const channelTitle = comment.snippet.topLevelComment.snippet.authorDisplayName;
  const publishedAt = comment.snippet.topLevelComment.snippet.publishedAt;
  const commentContent = comment.snippet.topLevelComment.snippet.textOriginal;
  const likeCount = comment.snippet.topLevelComment.snippet.likeCount;
  const replyCount = comment.snippet.totalReplyCount;
  
  return(
    <li className="comment">
      <div className="d-flex">
        <img className="comment--channel-thumbnail" alt="" src={thumbnailURL} />
        <div>
          <div className="comment--info">
            <p className="comment--channel-title">{channelTitle}</p>
            <p className="comment--publish-time">{moment(publishedAt).fromNow()}</p>
          </div>
          <p className="comment--content mb-1">{commentContent}</p>
          <div className="d-flex">
            <p className="me-2"><FontAwesomeIcon icon={faThumbsUp} /> {likeCount}</p>
            <p>{replyCount} replies</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Comment;