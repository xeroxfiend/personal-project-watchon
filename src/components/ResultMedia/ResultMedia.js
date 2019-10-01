import React, {Component} from "react";
import "./resultmedia.css";

class ResultMedia extends Component {
  render() {
    const mappedLocations = this.props.data.locations.map((el, i) => (
      <img
        key={i}
        onClick={() => window.open(el.url)}
        src={el.icon}
        alt="location"
        className="location"
      />
    ));
    return (
      <div className="result-media">
        {this.props.data.name}
        <img src={this.props.data.picture} alt="poster" className="poster" />
        <h3 className="available">Available on: {mappedLocations}</h3>
      </div>
    );
  }
}

export default ResultMedia;
