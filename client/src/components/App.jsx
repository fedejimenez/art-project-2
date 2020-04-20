import React, { Component } from "react";
import "../stylesheets/App.css";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import PostList from "./PostList";
import PostInfo from "./PostInfo";
import PostAdd from "./PostAdd";
import PostEdit from "./PostEdit";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

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
  <nav className="navbar navbar-expand-lg navbar-light">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          exact
          className="nav-link"
          activeClassName="active"
          to="/posts"
        >
          Posts
        </NavLink>
      </li>
      {localStorage.getItem("jwt") ? (
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/logout">
            Log Out
          </NavLink>
        </li>
      ) : (
        <li className="nav-item">
          <NavLink
            exact
            className="nav-link"
            activeClassName="active"
            to="/login"
          >
            Log In
          </NavLink>
        </li>
      )}
    </ul>
  </nav>
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
