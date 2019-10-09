import React, {Component} from "react";
import axios from "axios";
import store from "../../store";
import swal from "sweetalert2";
import defaultPoster from "../../assets/defaultPoster.JPG";
import add from '../../assets/plus.png'

class ResultMedia extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      userId: reduxState.userId
    };
  }

  addToPlaylist() {
    if (!this.state.userId)
      return swal.fire({
        background: "lightgrey",
        showConfirmButton: false,
        title: "Login to add to your playlist",
        timer: 1500
      });
    axios
      .post("/api/playlist", {
        userId: this.state.userId,
        data: JSON.stringify({
          name: this.props.data.name,
          poster: this.props.data.picture,
          year: this.props.data.year ? this.props.data.year : null,
          poster_imdb: this.props.data.poster ? this.props.data.poster : null,
          locations: this.props.data.locations,
          api_id: this.props.data.id
        }),
        api_id: this.props.data.id
      })
      .then(res => {
        swal.fire({
          background: "lightgrey",
          showConfirmButton: false,
          title: res.data.message,
          timer: 1000
        });
      });
  }

  render() {
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
      <div className="result-media">
        <div className="title-img">
          <h2 className="media-title">{this.props.data.name}</h2>
          <img
            src={
              this.props.data.poster ? this.props.data.poster : defaultPoster
            }
            alt="poster"
            className="poster"
          />
        </div>
        <div className="released-available-result">
          {this.props.data.year ? (
            <div className="year">
              Released: <p className="year-number">{this.props.data.year}</p>
            </div>
          ) : (
            <div className="empty-year"></div>
          )}
          <p className="available-text-result">Available on: </p>
          <div className="mapped-locations-result">{mappedLocations}</div>
        </div>
        <div onClick={() => this.addToPlaylist()} className="add-image-text">
          <img src={add} alt='add' className="add-to-playlist" />
          <p className="add-text">playlist</p>
        </div>
      </div>
    );
  }
}

// use the below code to use utelly images.

// return (
//   <div className="result-media">
//     <div className="title-img">
//       <h2 className="media-title">{this.props.data.name}</h2>
//       <img
//         src={
//           this.props.data.poster || this.props.data.picture
//             ? this.props.data.poster
//               ? this.props.data.poster
//               : this.props.data.picture
//             : defaultPoster
//         }
//         alt="poster"
//         className="poster"
//       />
//     </div>
//     <div className="released-available-result">
//       {this.props.data.year ? (
//         <div className="year">
//           Released: <p className="year-number">{this.props.data.year}</p>
//         </div>
//       ) : (
//         <div className="empty-year"></div>
//       )}
//       <p className="available-text-result">Available on: </p>
//       <div className="mapped-locations-result">{mappedLocations}</div>
//     </div>
//     <div onClick={() => this.addToPlaylist()} className="add-image-text">
//       <img src={add} alt='add' className="add-to-playlist" />
//       <p className="add-text">playlist</p>
//     </div>
//   </div>
// );
// }
// }



export default ResultMedia;
