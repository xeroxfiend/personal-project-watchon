import React, {Component} from "react";
import store, {UPDATE_SEARCH_STATE} from "../../store";
import searchIcon from "../../assets/search.png";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ""
    };
  }

  handleChange(value) {
    this.setState({
      searchInput: value
    });
  }

  handleSearch() {
    store.dispatch({
      type: UPDATE_SEARCH_STATE,
      payload: this.state.searchInput
    });
    this.setState({
      searchInput: ""
    });
    this.props.history.push("/results");
  }

  render() {
    return (
      <div className="landing">
        <h1 className="description">
          Search for a show or movie to see where you can watch it!
        </h1>
        <div className="search">
          <input
            placeholder='Search for a TV show or Movie'
            value={this.state.searchInput}
            onChange={e => this.handleChange(e.target.value)}
            type="text"
            className="search-bar"
          />
          <img
            src={searchIcon}
            alt="search"
            onClick={() => this.handleSearch()}
            className="search-button-landing"
          />
        </div>
      </div>
    );
  }
}

export default Landing;
