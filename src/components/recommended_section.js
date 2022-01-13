import React from "react";
import RecommendedVideo from "./recommended_video";

import "../styles/recommended.scss"

const RecommendedSection = (prop) => {
    return (
        <ul className="list-group">
            {prop.videos.map((video) => {
                return (
                    <RecommendedVideo 
                        key={video.etag}
                        video={video} />
                )
            })}
        </ul>
    );
}

export default RecommendedSection;