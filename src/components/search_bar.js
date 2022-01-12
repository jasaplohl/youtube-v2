import React, { Component } from "react";

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = { search_term: "" };
    }

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return(
            <div>
                <input onChange={event => this.setState({ search_term: event.target.value })}/>
                <p>{this.state.search_term}</p>
            </div>
        );
    }

}

export default SearchBar;