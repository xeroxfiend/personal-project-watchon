import React, {Component} from "react";
import store from "../../store";
import axios from "axios";
import ResultMedia from "../ResultMedia/ResultMedia";
import netflix from "../../assets/Netflix.png";
import amazon from "../../assets/Amazon.png";

class Results extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      searchInput: reduxState.searchInput,
      results: [],
      hidden: true,
      netflix: true,
      amazon: true
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

  handleClick(key) {
    this.setState(prevState => {
      return {
        [key]: !prevState[key]
      };
    });
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

    let mappedResults;

    if (this.state.netflix && this.state.amazon) {
      // eslint-disable-next-line
      mappedResults = this.state.results.map((el, i) => (
        <ResultMedia
          netflix={this.state.netflix}
          amazon={this.state.amazon}
          data={el}
          key={i}
        />
      ));
    } else if (!this.state.netflix && this.state.amazon) {
      // eslint-disable-next-line
      const filteredNetflix = this.state.results.filter(el => {
        for (let i = 0; i < el.locations.length; i++) {
          if (el.locations[i].name === "NetflixUS") {
            break
          } else {
            return true;
          }
        }
      });
      mappedResults = filteredNetflix.map((el, i) => (
        <ResultMedia
          netflix={this.state.netflix}
          amazon={this.state.amazon}
          data={el}
          key={i}
        />
      ));
    } else if (this.state.netflix && !this.state.amazon) {
      // eslint-disable-next-line
      const filteredAmazon = this.state.results.filter(el => {
        for (let i = 0; i < el.locations.length; i++) {
          if (
            el.locations[i].name === "AmazonUS" ||
            el.locations[i].name === "AmazonPrimeUS"
          ) {
            break
          } else {
            return true;
          }
        }
      });
      mappedResults = filteredAmazon.map((el, i) => (
        <ResultMedia
          netflix={this.state.netflix}
          amazon={this.state.amazon}
          data={el}
          key={i}
        />
      ));
    }

    // console.log(mappedResults);
    // const mappedResults = this.state.results.map((el, i) => (
    //   <ResultMedia data={el} stripe={i % 2 === 0 ? "even" : "odd"} key={i} />
    // ));

    return (
      <div className="results-container">
        <h2 className="results-head">{text}</h2>
        <div className="filter">
          <img
            onClick={() => this.handleClick("netflix")}
            src={netflix}
            alt="netflix"
            className={this.state.netflix ? "netflix" : "netflix-false"}
          />
          <img
            onClick={() => this.handleClick("amazon")}
            src={amazon}
            alt="amazon"
            className={this.state.amazon ? "amazon" : "amazon-false"}
          />
        </div>
        <div className="results">{mappedResults}</div>
        <div className="footer-results"></div>
      </div>
    );
  }
}

export default Results;
