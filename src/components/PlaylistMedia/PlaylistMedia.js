import React, {Component} from "react";
import axios from "axios";
import store from "../../store";
import swal from "sweetalert2";
import starIcon from '../../assets/star.png'
import './playlistmedia.css'

class PlaylistMedia extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      userId: reduxState.userId,
      rating: null
    };
  }

  remove() {
    axios
      .delete(
        `/api/playlist?userId=${this.state.userId}&api_id=${this.props.data.api_id}`
      )
      .then(res => {
        swal.fire(res.data.message);
        this.props.getPlaylistFn();
      });
  }

  handleRating(num) {
      this.setState({
          rating: num
      })
      console.log(this.state)
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
        <h3>Rating: {this.props.data.rating}</h3>
        <h3 className="available-playlist">Available on: {mappedLocations}</h3>
        <div className="star-rating">
            <img onClick={() => this.handleRating(1)} src={starIcon} alt="star" className="star 1"/>
            <img onClick={() => this.handleRating(2)} src={starIcon} alt="star" className="star 2"/>
            <img onClick={() => this.handleRating(3)} src={starIcon} alt="star" className="star 3"/>
            <img onClick={() => this.handleRating(4)} src={starIcon} alt="star" className="star 4"/>
            <img onClick={() => this.handleRating(5)} src={starIcon} alt="star" className="star 5"/>
        </div>
        <button onClick={() => this.remove()} className="remove">
          Remove
        </button>
      </div>
    );
  }
}

export default PlaylistMedia;
