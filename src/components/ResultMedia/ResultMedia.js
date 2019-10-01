import React, {Component} from "react";
import './resultmedia.css'

class ResultMedia extends Component {
  render() {
    return <div className="result-media">
    {this.props.data.name}
    <img src={this.props.data.picture} alt="poster" className="poster"/>
    <h3 className="available">Available on: {this.props.data.locations[0].display_name}</h3>
    <img src={this.props.data.locations[0].icon} alt="" className="location"/>
    </div>;
  }
}

export default ResultMedia;
