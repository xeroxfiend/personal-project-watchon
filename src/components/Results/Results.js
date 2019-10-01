import React, {Component} from "react";
import store from "../../store";
import axios from "axios";
import ResultMedia from "../ResultMedia/ResultMedia";

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
    axios.get(`/api/search?term=${this.state.searchInput}`).then(res => {
      this.setState({
        results: res.data.results
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchInput !== this.state.searchInput) {
      axios.get(`/api/search?term=${this.state.searchInput}`).then(res => {
        this.setState({
          results: res.data.results
        });
      });
    }
  }

  render() {
    const mappedResults = this.state.results.map((el, i) => (
      <ResultMedia data={el} key={i} />
    ));
    return <div className="results">{mappedResults}</div>;
  }
}

export default Results;
