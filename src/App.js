import { Component } from 'react';
import './App.css';

import SearchBar from './components/search_bar';

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
 */

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      videos: []
    }

    this.fetchSearchResults("");
  }

  async fetchSearchResults (search_term) {
    fetch("https://www.googleapis.com/youtube/v3/search?" + new URLSearchParams({
      "key": process.env.REACT_APP_API_KEY,
      "maxResults": "10",
      "q": search_term,
      "part": "snippet"
    }), {
      method: "GET"
    })
      .then(response => {
        return response.json()
      })
      .then(videos => {
        videos = videos.items;
        this.setState({ videos }); // same as this.setState({ videos: videos });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
          <SearchBar />
      </div>
    );
  }
  
}

export default App;