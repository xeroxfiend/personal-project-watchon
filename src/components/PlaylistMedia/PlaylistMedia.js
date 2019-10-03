import React, {Component} from "react";
import axios from "axios";
import store from "../../store";
import starIcon from "../../assets/star.png";
// import "./playlistmedia.css";

class PlaylistMedia extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      userId: reduxState.userId,
      rating: 0
    };
  }

  componentDidMount() {
    this.setState({
      rating: this.props.data.rating
    });
  }

  remove() {
    axios
      .delete(
        `/api/playlist?userId=${this.state.userId}&api_id=${this.props.data.api_id}`
      )
      .then(() => {
        this.props.getPlaylistFn();
      });
  }

  handleRating(num) {
    if (this.state.rating === 1 && num === 1) {
      return this.setState(
        {
          rating: 0
        },
        () => {
          axios.put("/api/playlist", {
            userId: this.state.userId,
            api_id: this.props.data.api_id,
            rating: this.state.rating
          });
        }
      );
    }

    this.setState(
      {
        rating: num
      },
      () => {
        axios.put("/api/playlist", {
          userId: this.state.userId,
          api_id: this.props.data.api_id,
          rating: this.state.rating
        });
      }
    );
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
        <h2 className="playlist-title">{this.props.data.data.name}</h2>
        <img
          src={this.props.data.data.poster}
          alt="poster"
          className="poster"
        />
        <h3 className="available-playlist">Available on: {mappedLocations}</h3>
        <div className="star-rating">
          <img
            onClick={() => this.handleRating(1)}
            src={starIcon}
            alt="star"
            className={this.state.rating >= 1 ? "filled-star" : "empty-star"}
          />
          <img
            onClick={() => this.handleRating(2)}
            src={starIcon}
            alt="star"
            className={this.state.rating >= 2 ? "filled-star" : "empty-star"}
          />
          <img
            onClick={() => this.handleRating(3)}
            src={starIcon}
            alt="star"
            className={this.state.rating >= 3 ? "filled-star" : "empty-star"}
          />
          <img
            onClick={() => this.handleRating(4)}
            src={starIcon}
            alt="star"
            className={this.state.rating >= 4 ? "filled-star" : "empty-star"}
          />
          <img
            onClick={() => this.handleRating(5)}
            src={starIcon}
            alt="star"
            className={this.state.rating >= 5 ? "filled-star" : "empty-star"}
          />
        </div>
        <button onClick={() => this.remove()} className="remove">
          Remove
        </button>
      </div>
    );
  }
}

export default PlaylistMedia;
