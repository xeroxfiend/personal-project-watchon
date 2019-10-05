import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import store, {ADD_USER} from "../../store";
import {Link} from "react-router-dom";

class LoginSignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(value, key) {
    this.setState({
      [key]: value
    });
  }

  register() {
    if (!this.state.email || !this.state.password)
      return swal.fire("Email and Password cannot be blank");

    axios
      .post("/auth/register", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        store.dispatch({
          type: ADD_USER,
          payload: {
            userId: res.data.user.userId[0].user_id,
            userEmail: this.state.email
          }
        });
        this.props.history.goBack();
      })
      .catch(err => {
        if (err.response.status === 404)
          return swal.fire("User already exists");
      });
  }

  async login() {
    if (!this.state.email || !this.state.password)
      return swal.fire("Email and Password cannot be blank");
    let res;
    try {
      res = await axios.post("/auth/login", {
        email: this.state.email,
        password: this.state.password
      });
    } catch (err) {
      if (err.response.status === 404 || err.response.status === 403) {
        return swal.fire("Incorrect Email or Password");
      } else {
        return swal.fire("Unknown error!");
      }
    }

    store.dispatch({
      type: ADD_USER,
      payload: {
        userId: res.data.user.userId,
        userEmail: this.state.email
      }
    });

    if (!res.data.user) return swal.fire(res.data.message);
    this.props.history.goBack();
  }

  back() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="login-sign-up">
        <Link to='/' className='logo-login-link'>
          <h1 className="logo-login">ON</h1>
        </Link>
        <div className="login-form-container">
          <div className="x-container">
            <button onClick={() => this.back()} className="x">
              X
            </button>
          </div>
          <div className="container">
            <h2 className="login-register-title">Login or Register</h2>
          </div>
          <div className="login-inputs">
            <input
              placeholder="Email"
              onChange={e => this.handleChange(e.target.value, "email")}
              type="text"
              className="auth-email"
            />
            <input
              placeholder="Password"
              onChange={e => this.handleChange(e.target.value, "password")}
              type="password"
              className="auth-password"
            />
          </div>
          <div className="login-buttons">
            <button onClick={() => this.register()} className="register">
              Register
            </button>
            <button onClick={() => this.login()} className="login">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSignUp;
