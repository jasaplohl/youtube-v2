import "../styles/recommended.scss";
import moment from "moment";

const RecommendedVideo = ({ video, onVideoSelect }) => {
    const imgUrl = video.snippet.thumbnails.default.url;
    return(
        <li className="recommended--card" onClick={() => onVideoSelect(video)} >
            <img src={imgUrl} alt="video-thumbnail"/>
            <div className="recommended--details">
                <p className="recommended--title">{video.snippet.title}</p>
                <p className="recommended--info">{video.snippet.channelTitle}</p>
                <div className="d-flex pb-1">
                    <p className="recommended--info">{moment(video.snippet.publishedAt).fromNow()}</p>
                </div>
            </div>
        </li>
    );
}

export default RecommendedVideo;