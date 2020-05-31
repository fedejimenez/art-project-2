import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./Login";
import LoginControl from "./LoginControl";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn
    };
    console.log("state", this.state);
    console.log("props", this.props);
    this.handleLogout = this.handleLogout.bind(this);
    // this.handleLogin = this.handleLogin.bind(this);
  }
  // handleLogin() {
  //   this.setState({ loggedIn: true });
  //   console.log("handle login");
  // }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({ loggedIn: false });
    console.log("handle logout");
  }
  componentDidMount() {
    console.log("did mount navigation");
    if (localStorage.getItem("jwt") != null) {
      console.log("entra if");
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }
  render() {
    if (this.props.location) {
      const state = this.props.location.state;
      console.log("state navigation", state);
    }
    return (
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Navbar.Brand href="/" className="navbar nav-item">
          Hui Lin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey="2" as={Link} to="/posts">
                Posts
              </Nav.Link>
            </Nav.Item>
            {/* {this.state.loggedIn ? (
              <Nav.Item>
                <Nav.Link
                  eventKey="4"
                  as={Link}
                  to="/logout"
                  onClick={this.handleLogout}
                >
                  Log Out
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Nav.Link
                  eventKey="4"
                  as={Link}
                  to={{
                    pathname: "/login",
                    state: {
                      loggedIn: this.state.loggedIn
                    }
                  }}
                  data-userid={this.state.loggedIn}
                  // onClick={this.handleLogin}
                >
                  Log In
                </Nav.Link>
              </Nav.Item>
            )} */}
            <NavItem>
              <LoginControl />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
