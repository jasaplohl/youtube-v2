import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"

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
            <div className="d-flex">
                <input 
                    onChange={event => this.setState({ search_term: event.target.value })}
                    className="form-control"/>
                <button className="btn btn-outline-primary"><span className="d-flex align-items-center"><FontAwesomeIcon icon={faSearch} />Search</span></button>
            </div>
        );
    }

}

export default SearchBar;