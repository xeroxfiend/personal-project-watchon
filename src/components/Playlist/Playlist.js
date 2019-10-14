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
    if (!this.state.userId) {
      return this.props.history.push("/");
    }
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        userId: reduxState.userId
      });
    });
    this.getPlaylist();
  }

  render() {
    const mappedPlaylist = this.state.playlist.map((el, i) => (
      <PlaylistMedia stripe={i % 2 === 0 ? 'even' : 'odd'} getPlaylistFn={this.getPlaylist} data={el} key={i} />
    ));

    return <div className="playlist">
      <h1 className="playlist-head">Playlist</h1>
    {mappedPlaylist}
    <div className="footer-playlist"></div>
    </div>;
  }
}

export default Playlist;
