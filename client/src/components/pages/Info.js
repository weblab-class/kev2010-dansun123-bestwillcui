import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Info.css";
import { get, post } from "../../utilities";
import CreateRoom from "../modules/CreateRoom.js"
import Chatbook from "./Chatbook.js"
import { Collection, mongo } from "mongoose";


class Info extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
        <div>
            <p>hey</p>
        </div>
    );
  }
}

export default Info;
