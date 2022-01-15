import React, { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"

import "../styles/video.scss";

class Video extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        // If the video hasnt loaded yet, display a loading spinner
        if(!this.props.video || !this.props.ratings) {
            return(
                <div className="d-flex justify-content-center mt-4">
                    <TailSpin />
                </div>
            );
        }

        console.log(this.props.video);
        
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
                            <p className="pe-2 text-sm">{publishedAt}</p>
                            <p className="text-sm">{Number(viewCount).toLocaleString()} views</p>
                        </div>
                        <p><FontAwesomeIcon icon={faThumbsUp} />{Number(likeCount).toLocaleString()}</p>
                    </div>
                    <hr />
                    <p>{channelTitle}</p>
                    <p className="video--description">{description}</p>
                    <hr />
                    <p>{commentCount} comments</p>
                </div>
            </div>
        );
    }

}

export default Video;