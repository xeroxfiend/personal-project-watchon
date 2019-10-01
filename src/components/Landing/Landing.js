import React, {Component} from 'react'

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            searchInput: ''
        }
    }


    render() {
        console.log(this.props)
        return (
            <div className="landing">
                Landing!
            </div>
        )
    }
}


export default Landing