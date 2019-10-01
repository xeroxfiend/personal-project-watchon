import React, {Component} from "react";

class ResultMedia extends Component {
  render() {
    return <div className="result-media">{this.props.data.name}</div>;
  }
}

export default ResultMedia;
