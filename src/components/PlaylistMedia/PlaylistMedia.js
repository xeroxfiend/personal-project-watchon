import React, {Component} from "react";

class PlaylistMedia extends Component {
  render() {
    const mappedLocations = this.props.data.locations.map((el, i) => (
      <img
        key={i}
        onClick={() => window.open(el.url)}
        src={el.icon}
        alt="location"
        className="location-playlist"
      />
    ));

    return (
      <div className="playlist-media">
        {this.props.data.name}
        <img src={this.props.data.picture} alt="poster" className="poster" />
        <h3 className="available-playlist">Available on: {mappedLocations}</h3>
      </div>
    );
  }
}

export default PlaylistMedia;
