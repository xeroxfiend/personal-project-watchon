import React, {Component} from "react";
import store, {UPDATE_SEARCH_STATE} from "../../store";
import searchIcon from "../../assets/search.png";
import Swal from "sweetalert2";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      placeholderText: [
        "Game of Thrones",
        "Chernobyl",
        "Sherlock",
        "The Sopranos",
        "Star Trek",
        "Fargo",
        "The Office",
        "The Shawshank Redemption",
        "The Dark Knight",
        "Pulp Fiction",
        "Fight Club",
        "Forrest Gump",
        "The Matrix",
        "Breaking Bad",
        "The Godfather",
        "Inception",
        "Stranger Things",
        "Seinfeld",
        "Interstellar",
        "Gladiator"
      ]
    };
  }

  handleEnter(key) {
    if (key === 13) {
      this.handleSearch()
    }
  }

  handleChange(value) {
    this.setState({
      searchInput: value
    });
  }

  handleSearch() {
    if (!this.state.searchInput) {
      return Swal.fire({background: 'lightgrey', showConfirmButton: false, title: "Enter a search term!", timer: 600});
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
    let randomPlaceholder = Math.ceil(Math.random() * 20);
    return (
      <div className="landing">
        <div className="landing-form">
          <h3 className="description">
            <p>Search</p> <p>for</p> <p>a</p> <p className="movie">Movie</p>{" "}
            <p>or</p> <p className="tv">TV</p> <p>show</p> <p>to</p> <p>see</p>{" "}
            <p>where</p> <p>you</p> <p>can</p> <p>watch</p> <p>it!</p>
          </h3>
          <div className="search">
            <input
              placeholder={`'${this.state.placeholderText[randomPlaceholder]}'`}
              value={this.state.searchInput}
              onChange={e => this.handleChange(e.target.value)}
              onKeyDown={e => this.handleEnter(e.keyCode)}
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
