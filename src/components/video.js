import React, { Component } from "react";
import { TailSpin } from "react-loader-spinner";

import "../styles/video.scss";

class Video extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewCount: 0,
            likeCount: 0,
            commentCount: 0
        };
    }

    getVideoRating(videoId) {
        fetch("https://www.googleapis.com/youtube/v3/videos?" + new URLSearchParams({
            "key": process.env.REACT_APP_API_KEY,
            "id": videoId,
            "part": "statistics"
        }), {
            method: "GET"
        })
          .then(response => {
            return response.json();
          })
          .then(response => {
                this.setState({
                    viewCount: response.items[0].statistics.viewCount,
                    likeCount: response.items[0].statistics.likeCount,
                    commentCount: response.items[0].statistics.commentCount
                });
          })
          .catch(error => {
              console.log(error);
          });
    }
    
    render() {
        let videoId;
        let url;
        let title;
        let description;

        if(this.props.video) {
            videoId = this.props.video.id.videoId;
            url = `https://www.youtube.com/embed/${videoId}`;
            title = this.props.video.snippet.title;
            description = this.props.video.snippet.description;

            this.getVideoRating(videoId);
        }
        
        return(
            <div className="video-container">
                {this.props.video ? (
                    <div>
                        <div className="video-container--video">
                            <iframe src={url}></iframe>
                        </div>
                        <div className="video-container--details">
                            <p>{this.state.viewCount}</p>
                            <p>{this.state.likeCount}</p>
                            <p>{this.state.commentCount}</p>
                            <p className="video-container--title">{title}</p>
                            <p className="video-container--description">{description}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <TailSpin />
                    </div>
                )}
            </div>
        );
        
    }
}

export default Video;