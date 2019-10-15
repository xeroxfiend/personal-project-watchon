import React, {Component} from "react";
import PlaylistMedia from "../PlaylistMedia/PlaylistMedia";
import axios from "axios";
import store from "../../store";
import {MoonLoader} from "react-spinners";
import {css} from '@emotion/core'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Playlist extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      playlist: [],
      userId: reduxState.userId,
      loading: true
    };
    this.getPlaylist = this.getPlaylist.bind(this);
  }

  getPlaylist() {
    axios.get(`/api/playlist/${this.state.userId}`).then(res => {
      this.setState({
        playlist: res.data,
        loading: false
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
      <PlaylistMedia
        stripe={i % 2 === 0 ? "even" : "odd"}
        getPlaylistFn={this.getPlaylist}
        data={el}
        key={i}
      />
    ));

    return (
      <div className="playlist">
        {!this.state.loading ? (
          <>
            <h1 className="playlist-head">Playlist</h1>
            {mappedPlaylist}
            <div className="footer-playlist"></div>
          </>
        ) : (
          <>
            <div className="loading-playlist">
              <MoonLoader
                color={"#46e4c1"}
                css={override}
                sizeUnit={"px"}
                size={75}
                loading={this.state.loading}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Playlist;
