import React, {Component} from "react";
import axios from "axios";
import store from "../../store";
import starIcon from "../../assets/star.png";
import defaultPoster from "../../assets/defaultPoster.JPG";
import remove from "../../assets/minus.png";

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
          className={el.display_name}
        />
      ));
    }

    return (
      <div className={`playlist-media-${this.props.stripe}`}>
        <img
          src={
            this.props.data.data.poster_imdb ? this.props.data.data.poster_imdb : defaultPoster
          }
          alt="poster"
          className="poster"
        />
        <div className="title-star-released-available">
          <h2 className="playlist-title">{this.props.data.data.name}</h2>
          {this.props.data.data.year ? (
            <div className="year-playlist">
              Released: {" "}
              <p className="year-number-playlist">{this.props.data.data.year}</p>
            </div>
          ) : (
            <div className="empty-year"></div>
          )}
          <div className="star-rating">
            <p className="my-rating">My Rating:</p>
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
          <div className="available-playlist">
            <p className="available-text"> Available on: </p>
            <div className="mapped-locations">{mappedLocations}</div>
          </div>
        </div>
        <div onClick={() => this.remove()} className="remove">
          <img className="remove-img" src={remove} alt="remove" />
          <p className="remove-text">remove</p>
        </div>
      </div>
    );
  }
}

// use the code below to use utelly images

// return (
//   <div className={`playlist-media-${this.props.stripe}`}>
//     <img
//       src={
//         this.props.data.data.poster_imdb || this.props.data.data.poster
//           ? this.props.data.data.poster_imdb
//             ? this.props.data.data.poster_imdb
//             : this.props.data.data.poster
//           : defaultPoster
//       }
//       alt="poster"
//       className="poster"
//     />
//     <div className="title-star-released-available">
//       <h2 className="playlist-title">{this.props.data.data.name}</h2>
//       {this.props.data.data.year ? (
//         <div className="year-playlist">
//           Released: {" "}
//           <p className="year-number-playlist">{this.props.data.data.year}</p>
//         </div>
//       ) : (
//         <div className="empty-year"></div>
//       )}
//       <div className="star-rating">
//         <p className="my-rating">My Rating:</p>
//         <img
//           onClick={() => this.handleRating(1)}
//           src={starIcon}
//           alt="star"
//           className={this.state.rating >= 1 ? "filled-star" : "empty-star"}
//         />
//         <img
//           onClick={() => this.handleRating(2)}
//           src={starIcon}
//           alt="star"
//           className={this.state.rating >= 2 ? "filled-star" : "empty-star"}
//         />
//         <img
//           onClick={() => this.handleRating(3)}
//           src={starIcon}
//           alt="star"
//           className={this.state.rating >= 3 ? "filled-star" : "empty-star"}
//         />
//         <img
//           onClick={() => this.handleRating(4)}
//           src={starIcon}
//           alt="star"
//           className={this.state.rating >= 4 ? "filled-star" : "empty-star"}
//         />
//         <img
//           onClick={() => this.handleRating(5)}
//           src={starIcon}
//           alt="star"
//           className={this.state.rating >= 5 ? "filled-star" : "empty-star"}
//         />
//       </div>
//       <div className="available-playlist">
//         <p className="available-text"> Available on: </p>
//         <div className="mapped-locations">{mappedLocations}</div>
//       </div>
//     </div>
//     <div onClick={() => this.remove()} className="remove">
//       <img className="remove-img" src={remove} alt="remove" />
//       <p className="remove-text">remove</p>
//     </div>
//   </div>
// );
// }
// }

export default PlaylistMedia;
