import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import store, {UPDATE_SEARCH_STATE} from "../../store";
import {Link} from "react-router-dom";
import "./header.css";
// import loggedInImage from "../../assets/logged_in.png";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";

class Header extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      searchInput: "",
      userId: reduxState.userId
    };
  }

  componentDidMount() {
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
    let header;
    if (this.props.location.pathname === "/") {
      header = (
        <div className="landing-header">
          <img src={logo} alt="logo" className="logo" />
          {this.state.userId ? (
            <Link to="/playlist">
              <h4 className="logged-in-header">Playlist</h4>
            </Link>
          ) : (
            <Link to="/login">
              <h4 className="not-logged-in">Register/Login</h4>
            </Link>
          )}
        </div>
      );
    } else if (this.props.location.pathname === "/login") {
      header = <div className="invisible-header"></div>;
    } else {
      header = (
        <div className="header">
          <img src={logo} alt="logo" className="logo" />
          <div className="search">
            <input
              placeholder="Search for a TV show or Movie"
              value={this.state.searchInput}
              onChange={e => this.handleChange(e.target.value)}
              type="text"
              className="search"
            />
            <img
              onClick={() => this.handleSearch()}
              src={searchIcon}
              alt=""
              className="search-icon"
            />
          </div>
          {this.state.userId ? (
            <Link to="/playlist">
              <h4 className="logged-in-header">Playlist</h4>
            </Link>
          ) : (
            <Link to="/login">
              <h4 className="not-logged-in">Register/Login</h4>
            </Link>
          )}
        </div>
      );
    }
    return <div className="header-container">{header}</div>;
  }
}

//   render() {
//     return (
//       <div className="header-container">
//         {this.props.location.pathname === "/" ||
//         this.props.location.pathname === "/login" ? (
//           <div className="header-no-search"></div>
//         ) : (
//           <div className="header">Header!</div>
//         )}
//       </div>
//     );
//   }
// }

export default withRouter(Header);
