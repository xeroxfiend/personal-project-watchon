import React, {Component} from "react";
import store from "../../store";
import axios from "axios";
import ResultMedia from "../ResultMedia/ResultMedia";
import netflix from "../../assets/Netflix.png";
import amazon from "../../assets/Amazon.png";
// import spinner from "../../assets/spinner.png";
import {MoonLoader} from "react-spinners";
import {css} from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Results extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      searchInput: reduxState.searchInput,
      results: [],
      hidden: true,
      netflix: true,
      amazon: true,
      loading: true
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
    axios
      .get(`/api/search?term=${this.state.searchInput}`)
      .then(res => {
        this.setState({
          results: res.data.results,
          hidden: false,
          loading: false
        });
      })
      .catch(err => {
        // this.setState()
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchInput !== this.state.searchInput) {
      this.setState({
        loading: true
      });
      axios
        .get(`/api/search?term=${this.state.searchInput}`)
        .then(res => {
          this.setState({
            loading: false,
            results: res.data.results,
            hidden: false
          });
        })
        .catch(err => {
          // this.setState()
          console.log(err);
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
        // for (let i = 0; i < el.locations.length; i++) {
        //   if (el.locations[i].name === "NetflixUS") {
        //     break;
        //   } else {
        //     return true;
        //   }
        // }
        // return false;
        if (el.locations.length === 1 && el.locations[0].name === "NetflixUS") {
          return false;
        }
        return true;
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
        // for (let i = 0; i < el.locations.length; i++) {
        //   if (
        //     el.locations[i].name === "AmazonUS" ||
        //     el.locations[i].name === "AmazonPrimeUS"
        //   ) {
        //     break;
        //   } else {
        //     return true;
        //   }
        // }
        // return false;
        const netflixLocation = el.locations.find(location => {
          if (location.name === "NetflixUS") {
            return true;
          }
          return false;
        });
        if (netflixLocation) return true;
        return false;
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
        {!this.state.loading ? (
          <>
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
            <div className="results">
              {mappedResults}
              <div className="grid-results"></div>
            </div>
          </>
        ) : (
          <>
            <div className="loading-results">
              {/* <img className='spinner' src={spinner} alt="loading"/> */}
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

export default Results;
