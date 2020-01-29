import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Lobby.css";
import { get, post } from "../../utilities";
import CreateRoom from "../modules/CreateRoom.js"
import Chatbook from "./Chatbook.js"


class Lobby extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    let theState = props.state;
    theState.userlist = [theState.userId];  // add everyone online into this somewhow using sockets
    theState.cardrooms = [];
    theState.selected_room = "";
    theState.createGroup = false;
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
      get('/api/cardroom', {room: this.state.selected_room}).then((cardroom) => {

      })
    }

    this.createRoom = (title, description) => {
      post('/api/cardroom', {title: title, description: description, username: this.state.username, name: this.state.name, creator_id: this.state.userId}).then((cardroom) => {
        console.log(JSON.stringify(cardroom))
      })
    }

    this.updateCreateGroup = () => {
      this.setState((prevState) => ({
        createGroup: !prevState.createGroup
      }))
      console.log(this.state.createGroup)
    }
  }

  showRoomInfo = (cardroom) => {
    return (
      <div>
        <h1>{cardroom.title}</h1>
        <p>{cardroom.description}</p>
      </div>
    );
  }

  componentDidMount() {
    // remember -- api calls go here!
    this.loadGames()
  }

  render() {

    return (
        <div>
          <h1 className="header">Lobby</h1>
          <hr className="hr"></hr>

          <div className="lobby">
            <table>
              <thead>
                <tr>
                  <th>Room</th>
                  <th scope="col">Host</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {   
                    this.state.cardrooms.map((cardroom) => {
                        return (
                            <tr className="rooms">
                              <td>{cardroom.title}</td>
                              <td>{cardroom.host.username}</td>
                              <td>{cardroom.players.length}/8</td>
                            </tr>
                        )
                    })
                }
              </tbody>
            </table>
            
            <div className="additional">
              <div className="info">
                <h1>Test</h1>
                <p>first game test!</p>
                <h3 className="current">Current Players</h3>
                <ul className="playerList">
                  <li>donKAY</li>
                  <li>dansun</li>
                </ul>
              </div>

              <table className="users">
                <thead>
                  <tr>
                    <th>Online Users</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kevin Jiang</td>
                  </tr>
                  <tr>
                    <td>Daniel Sun</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bot">
            <button className="join" onClick = {this.joinRoom}>Join!</button>
          </div>

          <div className="bot">
            <button className="join" onClick = {this.loadGames}>Load Lobby!</button>
          </div>

          <div className="bot">
            <button className="join" onClick = {this.updateCreateGroup}>Create Room!</button>
          </div>

          <div className = 'chat'>
            <Chatbook userId={this.state.userId}/>
          </div>

          {this.state.createGroup ? <CreateRoom cancelSubmit = {this.updateCreateGroup} createRoom = {this.createRoom}></CreateRoom> : <div></div>}
          
        </div>
    );
  }
}

export default Lobby;
