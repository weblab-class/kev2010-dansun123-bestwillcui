import React, { Component } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tempName: '',
        tempProfile: '',
        tempGames: [],
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user , username: user.username}));
  }

  handleUsernameChange = (event) => {
      this.setState({
          tempName: event.target.value
      })
      event.preventDefault()
  }

  handleUsernameSubmit = (event) => {
    alert("hi"+this.state.user.name+this.state.username+this.state.tempName)
    post("/api/username", {userId: this.props.userId, username: this.state.tempName}).then((res) => {
        this.setState({
            username: res.username
        })
      });
    event.preventDefault()
  };

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <div
          className="Profile-avatarContainer"
        >
          <div className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.username}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
              {this.state.tempProfile}
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Games</h4>
            <div id="favorite-cat">
                {this.state.tempGames}
            </div>
          </div>
            <form onSubmit={this.handleUsernameSubmit}>
                <label>
                Change Username
                <input 
                    type="text" 
                    name="username"
                    value={this.state.tempName} 
                    onChange={this.handleUsernameChange} />
                </label>
                <input type="submit" value="Set Player" />
            </form>
            {/* <button onClick = {console.log(JSON.stringify(this.state))}>Click me</button> */}
        </div>
      </>
    );
  }
}

export default Profile;
