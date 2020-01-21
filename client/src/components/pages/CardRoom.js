import React, { Component } from "react";
import './CardRoom.css';
import WarGame from './WarGame.js';
import Sandbox from './Sandbox.js'

import "../../utilities.css";


class CardRoom extends Component {
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
    //   <div className="CardRoom">
    //     <div className="CardRoom-body">
    //       <WarGame> </WarGame>
    //     </div>
    //   </div>
      <div>
        <Sandbox></Sandbox>
      </div>
    );
  }
}

export default CardRoom;
