import React, {Component} from "react";
import store, {UPDATE_SEARCH_STATE} from "../../store";
import searchIcon from "../../assets/search.png";
import Swal from "sweetalert2";

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
    if (!this.state.searchInput) {
      return Swal.fire("Enter a search!");
    }
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
        <div className="landing-form">
          <h1 className="landing-title">watchON</h1>
          <h3 className="description">
            Search for a Movie or TV show to see where you can watch it!
          </h3>
          <div className="search">
            <input
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
      </div>
    );
  }
}

export default Landing;
