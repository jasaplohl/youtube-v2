import { Component } from 'react';

import SearchBar from './components/search_bar';
import Video from './components/video';
import RecommendedSection from './components/recommended_section';

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
      ratings: null
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
        this.getVideoRating(this.state.currentVideo.id.videoId)
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

  onVideoSelect(currentVideo) {
    this.setState({
      currentVideo
    });
    this.getVideoRating(currentVideo.id.videoId);
  }

  onSearchClick(search_term) {
    this.fetchSearchResults(search_term);
  }

  render() {
    return (
      <div className="app-container">
        <SearchBar 
          onSearchClick={(search_term) => this.onSearchClick(search_term)}/>
        {this.state.videos ? (
          <div id="pageContent">
            <div id="videoContainer">
              <Video 
                video={this.state.currentVideo} 
                ratings={this.state.ratings} />
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
    );
  }
  
}

export default App;