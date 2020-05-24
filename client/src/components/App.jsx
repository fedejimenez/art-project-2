import React, { Component } from "react";
import "../stylesheets/App.css";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import PostList from "./PostList";
import PostInfo from "./PostInfo";
import PostAdd from "./PostAdd";
import PostEdit from "./PostEdit";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="App-header">
            <Navigation />
          </div>
          <div className="Main">
            <Main />
          </div>
        </div>
      </Router>
    );
  }
}

const Navigation = () => (
  <Navbar collapseOnSelect expand="lg" variant="light">
    <Navbar.Brand href="/" className="navbar nav-item">
      Hui Lin
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto" />
      <Nav>
        {/* <Nav.Item>
          <Nav.Link eventKey="1" as={Link} to="/">
            Home
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
          <Nav.Link eventKey="2" as={Link} to="/posts">
            Posts
          </Nav.Link>
        </Nav.Item>

        {localStorage.getItem("jwt") ? (
          <Nav.Item>
            <Nav.Link eventKey="4" as={Link} to="/logout">
              Log Out
            </Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Nav.Link eventKey="3" as={Link} to="/login">
              Log In
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/posts" component={PostList} />
    <Route exact path="/posts/new" component={PostAdd} />
    <Route exact path="/posts/:id" component={PostInfo} />
    <Route exact path="/posts/:id/edit" component={PostEdit} />
  </Switch>
);

export default App;
