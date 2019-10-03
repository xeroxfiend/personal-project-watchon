import React, {Component} from "react";
import axios from "axios";
import store from "../../store";
import swal from "sweetalert2";

class PlaylistMedia extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      userId: reduxState.userId
    };
  }

  remove() {
    axios
      .delete(
        `/api/playlist?userId=${this.state.userId}&api_id=${this.props.data.api_id}`
      )
      .then(res => {
        swal.fire(res.data.message);
      });
  }

  render() {
    let mappedLocations;

    if (this.props.data && this.props.data.data.locations) {
      mappedLocations = this.props.data.data.locations.map((el, i) => (
        <img
          key={i}
          onClick={() => window.open(el.url)}
          src={el.icon}
          alt="location"
          className="location-playlist"
        />
      ));
    }

    return (
      <div className="playlist-media">
        {this.props.data.data.name}
        <img
          src={this.props.data.data.poster}
          alt="poster"
          className="poster"
        />
        <h3 className="available-playlist">Available on: {mappedLocations}</h3>
        <button onClick={() => this.remove()} className="remove">
          Remove
        </button>
      </div>
    );
  }
}

export default PlaylistMedia;
