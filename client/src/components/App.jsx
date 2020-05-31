import React, { Component } from "react";
import "../stylesheets/App.css";
import Login from "./Login";
import Logout from "./Logout";
import PostList from "./PostList";
import PostInfo from "./PostInfo";
import PostAdd from "./PostAdd";
import PostEdit from "./PostEdit";
import Navigation from "./Navigation";
import NoMatch from "./NoMatch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    console.log("App", this.props);
  }

  handleLogin() {
    this.setState({ loggedIn: true });
  }

  handleLogout() {
    sessionStorage.clear();
    this.setState({ loggedIn: false });
  }

  componentDidMount() {
    console.log("did mount app");
    if (localStorage.getItem("jwt") != null) {
      console.log("entra al if");
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }
  render() {
    if (this.props.location) {
      const state = this.props.location.state;
      console.log("state app", state);
    }
    return (
      <Router>
        <div className="container">
          <div className="App-header">
            <Navigation loggedIn={this.state.loggedIn} />
          </div>
          <div className="Main">
            <Main />
          </div>
        </div>
      </Router>
    );
  }
}

const Main = () => (
  <Switch>
    <Route exact path="/" component={PostList} />
    <Route
      exact
      path="/login"
      component={Login}
      render={props => <Login logInHandler={this.handleLogin} {...props} />}
    />
    <Route
      exact
      path="/logout"
      component={Logout}
      render={props => <Logout logOutHandler={this.handleLogout} {...props} />}
    />
    <Route exact path="/posts" component={PostList} />
    <Route exact path="/posts/new" component={PostAdd} />
    <Route exact path="/posts/:id" component={PostInfo} />
    <Route exact path="/posts/:id/edit" component={PostEdit} />
    <Route component={NoMatch} />
  </Switch>
);

export default App;
