import React, {Component} from "react";
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
    if (!this.state.userId) swal.fire("Login to add an item to your playlist");
    axios
      .post("/api/playlist", {
        userId: this.state.userId,
        data: JSON.stringify({
          name: this.props.data.name,
          poster: this.props.data.picture,
          locations: this.props.data.locations,
          api_id: this.props.data.id
        }),
        api_id: this.props.data.id
      })
      .then(res => {
        swal.fire(res.data.message);
      });
  }

  render() {
    console.log(this.props.data.poster);
    const mappedLocations = this.props.data.locations.map((el, i) => (
      <img
        key={i}
        onClick={() => window.open(el.url)}
        src={el.icon}
        alt="location"
        className={el.display_name}
      />
    ));

    return (
      <div className={`result-media-${this.props.stripe}`}>
        <div className="title-poster-result">
          <h2 className="media-title">{this.props.data.name}</h2>
          <img
            src={
              this.props.data.poster
                ? this.props.data.poster
                : this.props.data.picture
              }
            alt="poster"
            className="poster"
          />
        </div>
        <div className="available-result">
          <p className="available-text-result">Available on: </p>
          <div className="mapped-locations-result">{mappedLocations}</div>
        </div>
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
