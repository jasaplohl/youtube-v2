import { Component } from 'react';

import SearchBar from './components/search_bar';
import Video from './components/video';
import RecommendedSection from './components/recommended_section';
import Header from './components/header';

/**
 * We can use two types of components in React:
 * 
 * - function components - function recieves parameters and returns a component
 * 
 * - class based components - can also have code with it, that can get executed even after
 *   the component has been rendered
 * 
 * Data flow should go downward -> parent should fetch the data and pass it to its
 * children.
 * 
 * Never call the setState() function inside the render() function, because that would result in
 * an endless loop.
 */

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      currentVideo: null,
      ratings: null,
      channelInfo: null,
      comments: null
    }
  }

  componentDidMount() {
    this.fetchSearchResults("");
  }

  fetchSearchResults (search_term) {
    fetch("https://www.googleapis.com/youtube/v3/search?" + new URLSearchParams({
      "key": process.env.REACT_APP_API_KEY,
      "maxResults": "10",
      "part": "snippet",
      "q": search_term
    }), {
      method: "GET"
    })
      .then(response => {
        return response.json()
      })
      .then(videos => {
        videos = videos.items;
        this.setState({ 
          videos, // same as this.setState({ videos: videos });
          currentVideo: videos[0]
         });
        this.getVideoRating(this.state.currentVideo.id.videoId);
        this.getChannelInfo(this.state.currentVideo.snippet.channelId);
        this.getComments(this.state.currentVideo.id.videoId);
      })
      .catch(error => {
        console.log(error);
      });
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
          ratings : {
            viewCount: response.items[0].statistics.viewCount,
            likeCount: response.items[0].statistics.likeCount,
            commentCount: response.items[0].statistics.commentCount
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getChannelInfo(channelId) {
    fetch("https://www.googleapis.com/youtube/v3/channels?" + new URLSearchParams({
      "key": process.env.REACT_APP_API_KEY,
      "id": channelId,
      "part": "statistics,snippet",
    }), {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          channelInfo : {
            subscribers: response.items[0].statistics.subscriberCount,
            thumbnail: response.items[0].snippet.thumbnails.default.url
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getComments(videoId) {
    fetch("https://www.googleapis.com/youtube/v3/commentThreads?" + new URLSearchParams({
      "key": process.env.REACT_APP_API_KEY,
      "videoId": videoId,
      "part": "snippet,replies",
    }), {
        method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({comments: response});
      })
      .catch(error => {
        console.log(error);
      });
  }

  onVideoSelect(currentVideo) {
    this.setState({
      currentVideo
    });
    this.getVideoRating(currentVideo.id.videoId);
    this.getChannelInfo(currentVideo.snippet.channelId);
    this.getComments(currentVideo.id.videoId);
  }

  onSearch(search_term) {
    this.fetchSearchResults(search_term);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="app-container">
          <SearchBar 
            onSearch={(search_term) => this.onSearch(search_term)}/>
          {this.state.videos ? (
            <div id="pageContent" className="pt-3">
              <div id="videoContainer">
                <Video 
                  video={this.state.currentVideo} 
                  ratings={this.state.ratings}
                  channelInfo={this.state.channelInfo}
                  comments={this.state.comments} />
              </div>
              <div id="recommendedSectionContainer">
                <RecommendedSection
                  onVideoSelect={(currentVideo) => this.onVideoSelect(currentVideo)}
                  videos={this.state.videos} />
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center pt-4">
              <p>There are no available videos at the moment</p>
            </div>
          )}
            
        </div>
      </div>
    );
  }
  
}

export default App;