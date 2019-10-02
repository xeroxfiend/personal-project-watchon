import React, {Component} from "react";
import PlaylistMedia from "../PlaylistMedia/PlaylistMedia";
import axios from "axios";
import store from "../../store";

class Playlist extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      playlist: [],
      userId: reduxState.userId
    };
  }

  componentDidMount() {
    axios.get(`/api/playlist/${this.state.userId}`).then(res => {
      console.log(res.data);
      this.setState({
        playlist: res.data
      });
    });
  }

  render() {
    const mappedPlaylist = this.state.playlist.map((el, i) => (
      <PlaylistMedia data={el} key={i} />
    ));

    return <div className="playlist">{mappedPlaylist}</div>;
  }
}

export default Playlist;
