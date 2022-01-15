import "../styles/recommended.scss"

const RecommendedVideo = ({ video, onVideoSelect }) => {
    const imgUrl = video.snippet.thumbnails.default.url;
    return(
        <li className="recommended--card" onClick={() => onVideoSelect(video)} >
            <img className="recommended--img" src={imgUrl} alt="video-thumbnail"/>
            <div>
                <p className="recommended--title">{video.snippet.title}</p>
                <p className="recommended--channel">{video.snippet.channelTitle}</p>
            </div>
        </li>
    );
}

export default RecommendedVideo;