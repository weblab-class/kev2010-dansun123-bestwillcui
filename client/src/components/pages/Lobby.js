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
    let theState = props.state;
    theState.cardrooms = [];
    theState.selected_room = "";
    theState.createGroup = False;
    this.state = theState;

    this.loadGames = () => {
      console.log("HOLD UP"+ this.state.username)
      get('/api/cardrooms').then((cardrooms) => {
        console.log(cardrooms)
        this.setState({
          cardrooms: cardrooms
        })
      })
    }

    this.joinRoom = () => {

    }

    this.createRoom = () => {
      post('/api/cardroom', {title: "Test", description: "first game test!", username: this.state.username, name: this.state.name, creator_id: this.state.userId}).then((cardroom) => {
        console.log(JSON.stringify(cardroom))
      })
    }
  }

  componentDidMount() {
    // remember -- api calls go here!
    this.loadGames()
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
            {   
                this.state.cardrooms.map((cardroom) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{cardroom.title}</td>
                          <td>{cardroom.host.username}</td>
                          <td>{cardroom.players.length}/8</td>
                        </tr>
                      </tbody>
                    )
                })
            }
          </table>

          <div className="bot">
            <button className="join" onClick = {this.joinRoom}>Join!</button>
          </div>

          <div className="bot">
            <button className="join" onClick = {this.loadGames}>Load Lobby!</button>
          </div>

          <div className="bot">
            <button className="join" onClick = {this.updateCreateGroup}>Create Room!</button>
          </div>

          {this.state.createGroup ? <createGroup cancelSubmit = {this.updateCreateGroup} joinRoom = {this.joinRoom}></createGroup> : <div></div>}
          
        </div>
    );
  }
}

export default Lobby;
