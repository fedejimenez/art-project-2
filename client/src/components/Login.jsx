import React, { Component } from "react";
import { post } from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const request = { auth: { email: email, password: password } };
    post("/api/user_token", request)
      .then(response => {
        localStorage.setItem("jwt", response.data.jwt);
        console.log("handle submit");
        this.setState({ error: false });
        this.props.history.push({
          pathname: "/",
          state: { loggedIn: true }
        });
      })
      .catch(error => {
        this.setState({ error: true });
        console.log("error", error);
      });
  }

  componentDidMount() {
    console.log("did mount login");
    if (localStorage.getItem("jwt") != null) {
      console.log("entra if");
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              id="email"
              type="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              id="password"
              type="password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
