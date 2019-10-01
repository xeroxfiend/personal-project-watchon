import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ""
    };
  }

  render() {
    return (
      <div className="header-container">
        {this.props.location.pathname === "/" ||
        this.props.location.pathname === "/login" ? (
          <div className="invisible"></div>
        ) : (
          <div className="header">Header!</div>
        )}
      </div>
    );
  }
}

export default withRouter(Header);
