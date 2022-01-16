import React, { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"

import Comment from "./comment";

import "../styles/video.scss";

class Video extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        // If the video hasnt loaded yet, display a loading spinner
        if(!this.props.video || !this.props.ratings || !this.props.channelInfo) {
            return(
                <div className="d-flex justify-content-center mt-4">
                    <TailSpin />
                </div>
            );
        }
        
        // Video info
        const videoId = this.props.video.id.videoId;
        const url = `https://www.youtube.com/embed/${videoId}`;
        const title = this.props.video.snippet.title;
        const channelTitle = this.props.video.snippet.channelTitle;
        const description = this.props.video.snippet.description;

        // Video ratings
        const viewCount = this.props.ratings.viewCount;
        const likeCount = this.props.ratings.likeCount;
        const commentCount = this.props.ratings.commentCount;

        // Channel info
        const subscribers = this.props.channelInfo.subscribers;
        const channelThumbnail = this.props.channelInfo.thumbnail;

        let publishedAt = new Date(this.props.video.snippet.publishedAt);
        const day = 1000 * 60 * 60 * 24; // Milliseconds in a day
        if(new Date() - publishedAt <= day) {
            publishedAt = moment(publishedAt).fromNow();
        } else {
            publishedAt = moment(publishedAt).format("DD. MMM. YYYY");
        }

        return(
            <div className="video">
                <div className="video--container">
                    <iframe className="video--video" title="currentVideo" src={url}></iframe>
                </div>
                <div className="video--details">
                    <p className="video--title">{title}</p>
                    <div className="video--ratings">
                        <div className="d-flex">
                            <p className="pe-2 text-sm mb-0">{publishedAt}</p>
                            <p className="text-sm mb-0">{Number(viewCount).toLocaleString()} views</p>
                        </div>
                        <p className="mb-0"><FontAwesomeIcon icon={faThumbsUp} /> {Number(likeCount).toLocaleString()}</p>
                    </div>
                    <hr />
                    <div className="d-flex">
                        <img alt="channelThumbnail" src={channelThumbnail} className="video--channel-thumbnail" />
                        <div>
                            <p className="video--channel-title">{channelTitle}</p>
                            <p className="video--channel-subscribers">{Number(subscribers).toLocaleString()} subscribers</p>
                            <p>{description}</p>
                        </div>
                    </div>
                    <hr />
                    {this.props.comments ? (
                        <div>
                            {!this.props.comments.error ? (
                                <div>
                                    <p>{commentCount} comments</p>
                                    <ul>
                                        {this.props.comments.items.map(comment => {
                                            return (
                                                <Comment 
                                                    key={comment.etag}
                                                    comment={comment}/>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                <p>The comments for this video have been disabled.</p>
                            )}
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center pt-3">
                            <TailSpin />
                        </div>
                    )}
                </div>
            </div>
        );
    }

}

export default Video;