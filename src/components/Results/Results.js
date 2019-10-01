import React, {Component} from "react";
import ResultMedia from "../ResultMedia/ResultMedia";
import store from "../../store";

class Results extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      searchInput: reduxState.searchInput,
      results: []
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        searchInput: reduxState.searchInput
      });
    });
    // console.log('whatever')
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchInput !== this.state.searchInput) {
        console.log('noice')
    }
  }

  render() {
    return (
      <div className="results">
        Results!
        <ResultMedia />
      </div>
    );
  }
}

export default Results;
