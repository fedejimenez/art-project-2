import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// const Logout = () => {
//   localStorage.removeItem('jwt');
//   return <Redirect to='/' />
// }
class Logout extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.props.logOutHandler();
    console.log("state out", this.state);
    //window.location.replace('/login');
  }

  render() {
    return <Redirect to="/" />;
  }
}
export default Logout;
