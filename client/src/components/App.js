import React, { Component } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import CardRoom from "./pages/CardRoom.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Lobby from "./pages/Lobby.js"
import Profile from "./pages/Profile.js"

import "./App.css";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

const GOOGLE_CLIENT_ID = "89738695293-ocu6eiao6gaq5apf7rraqiqpt6tp9rqa.apps.googleusercontent.com";


/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      username: undefined
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id, username: user.username });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id , username: user.username});
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined, username: undefined});
    post("/api/logout");
  };

  render() {

    const publicContent = (
      <div>
        <ul className="topbar">
          <li className="title"><a href="#">CardBox</a></li>
          <li className="login"><a href="#">  
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.handleLogin}
              onFailure={(err) => console.log(err)}
            /></a></li>
        </ul>

        <h1 className="prompt">Welcome to CardBox!</h1>
        <h2 className="prompt">Login to play card games with other users!</h2>
      </div>
    )

    const privateContent = (
      <div>
        <navbar>
          <ul className="topbar">
            <li className="title"><a href="/lobby">CardBox</a></li>
            <ul className="navigation">
              {/* <li className="tab"><a href="./lobby">Lobby</a></li> */}
              <li className="tab"><a href="./profile">Profile</a></li>
              <li><a href="#">
                <GoogleLogout
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={this.handleLogout}
                  onFailure={(err) => console.log(err)}
                /></a></li>
            </ul>
          </ul>
        </navbar>

        <Router>
          <div>
            <Link to="/cardroom" className="nav">CardRoom 1</Link>
            <Link to="/" className="nav">Lobby</Link>
            <Switch>
              <Lobby
                exact path="/"
                userId={this.state.userId}
              />
              <CardRoom
                exact path="/cardroom"
                userId={this.state.userId}
              />
              <Profile
                exact path="/profile"
                userId={this.state.userId}
                username = {this.state.username}
              />
              <NotFound default />
            </Switch>
          </div>
        </Router>
      </div>
    )

    return (
      <div>
          {!this.state.userId ? privateContent: publicContent}
      </div>
    );
  }
}

export default App;
