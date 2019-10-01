import React, {Component} from 'react'
import PlaylistMedia from '../PlaylistMedia/PlaylistMedia'

class Playlist extends Component {
    constructor() {
        super()
        this.state = {
            playlist: []
        }
    }


    render() {
        return (
            <div className="playlist">
                Playlist!
                <PlaylistMedia />
            </div>
        )
    }
}


export default Playlist