import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = { search_term: "" };
    }

    onFormSubmit(event) {
        this.props.onSearch(this.state.search_term);
        event.preventDefault();
    }

    render() {
        return(
            <form
                className="d-flex w-100"
                onSubmit={(e) => this.onFormSubmit(e)}>
                <input 
                    onChange={event => this.setState({ search_term: event.target.value })}
                    className="form-control"/>
                <button 
                    className="btn btn-outline-primary"
                    type="submit">
                    <span className="d-flex align-items-center"><FontAwesomeIcon icon={faSearch} />Search</span>
                </button>
            </form>
        );
    }

}

export default SearchBar;