import React, { Component } from "react";

import "../styles/video.scss";

class Video extends Component {
    render() {
        return(
            <div className="video-container">
                <div className="video-container--video">

                </div>
                <div>
                    <p className="video-container--description"></p>
                </div>
            </div>
        );
    }
}

export default Video;