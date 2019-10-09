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
      results: [],
      hidden: true
    };
  }

  componentDidMount() {
    // if (!this.state.results[0]) {
    //   return this.props.history.push("/");
    // }

    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        searchInput: reduxState.searchInput
      });
    });
    axios.get(`/api/search?term=${this.state.searchInput}`).then(res => {
      this.setState({
        results: res.data.results,
        hidden: false
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchInput !== this.state.searchInput) {
      axios.get(`/api/search?term=${this.state.searchInput}`).then(res => {
        this.setState({
          results: res.data.results,
          hidden: false
        });
      });
    }
  }

  render() {
    let text;
    if (this.state.hidden) {
      text = "";
    } else if (this.state.results.length > 0) {
      text = `Showing results for '${this.state.searchInput}'`;
    } else {
      text = `No results found for '${this.state.searchInput}'`;
    }

    const mappedResults = this.state.results.map((el, i) => (
      <ResultMedia data={el} stripe={i % 2 === 0 ? "even" : "odd"} key={i} />
    ));
    return (
      <div className="results-container">
        <h2 className="results-head">{text}</h2>
        <div className="results">{mappedResults}</div>
      </div>
    );
  }
}

export default Results;
