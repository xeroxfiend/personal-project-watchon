import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import store, {UPDATE_SEARCH_STATE, ADD_USER} from "../../store";
import {Link} from "react-router-dom";
import axios from "axios";
// import loggedInImage from "../../assets/logged_in.png";
import searchIcon from "../../assets/search.png";
import logoutIcon from "../../assets/logout.png";
import swal from "sweetalert2";

class Header extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      searchInput: "",
      userId: reduxState.userId,
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

  componentDidMount() {
    axios.get("/auth/user").then(res => {
      store.dispatch({
        type: ADD_USER,
        payload: {
          userEmail: res.data.email,
          userId: res.data.userId
        }
      });
    });

    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        userId: reduxState.userId
      });
    });
  }

  handleChange(value) {
    this.setState({
      searchInput: value
    });
  }

  handleSearch() {
    if (!this.state.searchInput) {
      return swal.fire("Enter a search!");
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

  logout() {
    axios.delete("/auth/logout").then(() => {
      store.dispatch({
        type: ADD_USER,
        payload: {
          userEmail: "",
          userId: ""
        }
      });
      if (this.props.history.location.pathname === "/playlist") {
        this.props.history.push("/");
      }
    });
  }

  handleEnter(key) {
    if (key === 13) {
      this.handleSearch()
    }
  }

  render() {
    const randomPlaceholder = Math.ceil(Math.random() * 20);
    let header;
    if (this.props.location.pathname === "/") {
      header = (
        <div className="landing-header">
          <Link className="logo-link" to="/">
            <h1 className="logo">ON</h1>
          </Link>
          {this.state.userId ? (
            <div className="logged-in">
              <Link className="logged-in-header" to="/playlist">
                <h4 className="logged-in-header">Playlist</h4>
              </Link>
              <img
                onClick={() => this.logout()}
                src={logoutIcon}
                alt="logout"
                className="logout"
              />
            </div>
          ) : (
            <Link className="not-logged-in-link" to="/login">
              <h4 className="not-logged-in">| Login</h4>
            </Link>
          )}
        </div>
      );
    } else if (this.props.location.pathname === "/login") {
      header = <div className="invisible-header"></div>;
    } else {
      header = (
        <div className="header">
          <Link className="logo-link" to="/">
            <h1 className="logo">ON</h1>
          </Link>
          <div className="search">
            <input
              placeholder={`'${this.state.placeholderText[randomPlaceholder]}'`}
              value={this.state.searchInput}
              onChange={e => this.handleChange(e.target.value)}
              onKeyDown={e => this.handleEnter(e.keyCode)}
              type="text"
              className="search-bar-header"
            />
            <img
              onClick={() => this.handleSearch()}
              src={searchIcon}
              alt=""
              className="search-button-header"
            />
          </div>
          {this.state.userId ? (
            <div className="logged-in">
              <Link className="logged-in-header" to="/playlist">
                <h4 className="logged-in-header">Playlist</h4>
              </Link>
              <img
                onClick={() => this.logout()}
                src={logoutIcon}
                alt="logout"
                className="logout"
              />
            </div>
          ) : (
            <Link className="not-logged-in-link2" to="/login">
              <h4 className="not-logged-in"> | Login</h4>
            </Link>
          )}
        </div>
      );
    }
    return <div className="header-container">{header}</div>;
  }
}

export default withRouter(Header);
