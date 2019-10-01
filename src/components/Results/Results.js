import React, {Component} from 'react'
import ResultMedia from '../ResultMedia/ResultMedia'

class Results extends Component {
    constructor() {
        super()
        this.state = {
            results: []
        }
    }


    render() {
        return (
            <div className="results">
                Results!
                <ResultMedia />
            </div>
        )
    }
}


export default Results