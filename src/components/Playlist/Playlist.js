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
    this.getPlaylist = this.getPlaylist.bind(this);
  }

  getPlaylist() {
    axios.get(`/api/playlist/${this.state.userId}`).then(res => {
      this.setState({
        playlist: res.data
      });
    });
  }

  componentDidMount() {
      store.subscribe(() => {
          const reduxState = store.getState()
          this.setState({
              userId: reduxState.userId
          })
      })
    this.getPlaylist()
  }

  render() {
    const mappedPlaylist = this.state.playlist.map((el, i) => (
      <PlaylistMedia getPlaylistFn={this.getPlaylist} data={el} key={i} />
    ));

    return <div className="playlist">{mappedPlaylist}</div>;
  }
}

export default Playlist;
