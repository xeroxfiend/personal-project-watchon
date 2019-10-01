import React, {Component} from 'react'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            searchInput: ''
        }
    }


    render() {
        return (
            <div className="header">
                Header!
            </div>
        )
    }
}


export default Header