import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Lobby.css";
import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class Lobby extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      cardrooms: [],

    };

    this.loadGames = () => {
      console.log("HOLD UP"+ this.props.username)
      get('/api/cardrooms').then((cardrooms) => {
        console.log(cardrooms)
        this.setState({
          cardrooms: cardrooms
        })
      })
    }

    this.createRoom = () => {
      post('/api/cardroom', {title: "Test", description: "first game test!", creator_id: this.props.userId}).then((cardroom) => {
        console.log(JSON.stringify(cardroom))
      })
    }
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
            <button className="join" onClick = {this.joinRoom}>Join!</button>
          </div>

          <div className="bot">
            <button className="join" onClick = {this.loadGames}>Load Lobby!</button>
          </div>



          <div className = "bot">
            <button className="createRoom" onClick = {this.createRoom}>Create Room!</button>
          </div>
        </div>
    );
  }
}

export default Lobby;
