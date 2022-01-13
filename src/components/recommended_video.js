import React, { Component } from "react";

class RecommendedVideo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            video: props.video
        };
    }

    render() {
        return(
            <div>
                <p>{this.state.video.snippet.title}</p>
            </div>
        );
    }
}

export default RecommendedVideo;