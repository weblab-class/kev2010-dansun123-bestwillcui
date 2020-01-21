import React, { Component } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import CardRoom from "./pages/CardRoom.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";

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
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {

    const publicContent = (
      <div>
        <header>
          <h1>Cardbox</h1>
        </header>

        <div className = "login">  
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        </div>
      </div>
    )

    const privateContent = (
      <div>
        <header>
          <h1>CardBox  &nbsp;&nbsp;&nbsp;&nbsp;
            {/* USE FLEXbox to align this in the header or something*/}
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.handleLogout}
              onFailure={(err) => console.log(err)}
            />
          </h1>
        </header>

        <Router>
          <div>
            <Link to="/cardroom" className="nav">CardRoom 1</Link>
            <Link to="/" className="nav">Lobby</Link>
            <Switch>
              <Skeleton
                exact path="/"
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                userId={this.state.userId}
              />
              <CardRoom
                exact path="/cardroom"
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                userId={this.state.userId}
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
