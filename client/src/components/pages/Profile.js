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
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ 
        user: user , 
        username: user.username, 
        profile: user.profile, 
        games: user.games, 
        image: user.image,
    }));
  }

  handleUsernameChange = (event) => {
      this.setState({
          tempName: event.target.value
      })
      event.preventDefault()
  }

  handleUsernameSubmit = (event) => {
    post("/api/username", {userId: this.props.userId, username: this.state.tempName}).then((res) => {
        this.setState({
            username: res.username
        })
      });
    event.preventDefault()
  };

  handleProfileChange = (event) => {
        this.setState({
            tempProfile: event.target.value
        })
        event.preventDefault()
    }

  handleProfileSubmit = (event) => {
    post("/api/profile", {userId: this.props.userId, profile: this.state.tempProfile}).then((res) => {
        this.setState({
            profile: res.profile
        })
        });
    event.preventDefault()
  };


  handleImageChange = (event) => {
    this.setState({
        tempImage: event.target.value
    })
    event.preventDefault()
  }

  handleImageSubmit = (event) => {
    post("/api/image", {userId: this.props.userId, image: this.state.tempImage}).then((res) => {
        this.setState({
            image: res.image
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
          <div className="Profile-avatar">
              <img src = {this.state.image}></img>
          </div>
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.username}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
              {this.state.profile}
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Games</h4>
            <div id="favorite-cat">
                {this.state.games}
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
                <input type="submit" value="Set Username" />
            </form>

            <form onSubmit={this.handleProfileSubmit}>
                <label>
                Change Profile
                <input 
                    type="text" 
                    name="profile"
                    value={this.state.tempprofile} 
                    onChange={this.handleProfileChange} />
                </label>
                <input type="submit" value="Set Profile" />
            </form>

            <form onSubmit={this.handleImageSubmit}>
                <label>
                Upload Image Link
                <input 
                    type="text" 
                    name="image"
                    value={this.state.tempImage} 
                    onChange={this.handleImageChange} />
                </label>
                <input type="submit" value="Set Image" />
            </form>
            <button onClick = {console.log(JSON.stringify(this.state))}>Click me</button>
        </div>
      </>
    );
  }
}

export default Profile;
