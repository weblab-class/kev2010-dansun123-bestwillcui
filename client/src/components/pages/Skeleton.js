import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "89738695293-ocu6eiao6gaq5apf7rraqiqpt6tp9rqa.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
        <h1>Good luck on your project :)</h1>
        <h2> What we provide in this skeleton</h2>
        <ul>
          <li>Google Auth (Skeleton.js & auth.js)</li>
          <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
          <li>User Model (auth.js & user.js)</li>
        </ul>
        <h2> What you need to change</h2>
        <ul>
          <li>Change the font in utilities.css DONE</li>
          <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js) DONE</li>
          <li>Change the Server CLIENT_ID for Google Auth (auth.js) DONE</li>
          <li>Change the Database SRV for Atlas (server.js) DONE</li>
          <li>Change the Database Name for MongoDB (server.js) DONE</li>
          <li>Add a favicon to your website at the path client/dist/favicon.ico DONE</li>
          <li>Update website title in client/dist/index.html DONE</li>
        </ul>
      </>
    );
  }
}

export default Skeleton;
