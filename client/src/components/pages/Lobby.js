import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Lobby.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class Lobby extends Component {
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
        <div>
          <h1 className="lobby">Lobby</h1>
          <hr className="hr"></hr>

          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th scope="col">Host</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CardRoom 1</td>
                <td>DanSun69</td>
                <td>1/8</td>
              </tr>
            </tbody>
          </table>

          <div className="bot">
            <button className="join">Join!</button>
          </div>
        </div>
    );
  }
}

export default Lobby;
