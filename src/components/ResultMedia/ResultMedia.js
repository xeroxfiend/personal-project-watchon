import React, {Component} from "react";
import "./resultmedia.css";
import axios from "axios";
import store from "../../store";
import swal from "sweetalert2";

class ResultMedia extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      userId: reduxState.userId
    };
  }

  addToPlaylist() {
    axios.post("/api/playlist", {
      userId: this.state.userId,
      data: JSON.stringify({
        name: this.props.data.name,
        poster: this.props.data.picture,
        locations: this.props.data.locations
      }),
      api_id: this.props.data.id
    }).then(res => {
        swal.fire(res.data.message)
    })
  }

  render() {
    console.log(this.props.data);
    const mappedLocations = this.props.data.locations.map((el, i) => (
      <img
        key={i}
        onClick={() => window.open(el.url)}
        src={el.icon}
        alt="location"
        className="location-results"
      />
    ));

    return (
      <div className="result-media">
        {this.props.data.name}
        <img src={this.props.data.picture} alt="poster" className="poster" />
        <h3 className="available-results">Available on: {mappedLocations}</h3>
        <button
          onClick={() => this.addToPlaylist()}
          className="add-to-playlist"
        >
          Add to playlist
        </button>
      </div>
    );
  }
}

export default ResultMedia;
