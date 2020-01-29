import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./CreateRoom.css";


export default function CreateRoom(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    function validateForm() {
      return title.length > 0
    }
  
    function handleSubmit(event) {
      props.createRoom(title, description)
      event.preventDefault();
    }

    function cancelSubmit(event) {
        setTitle("")
        setDescription("")
        props.cancelSubmit()
        event.preventDefault()
    }
  
    return (
      <div className = "Full">
      <div className="Login">  
        <form onSubmit={handleSubmit}>
          <h1>New Room</h1>
          <hr></hr>
          <div className="right">
            <FormGroup controlId="email" bsSize="large" className="form-inline" >
              <FormLabel>Room Name: &nbsp; &nbsp;</FormLabel>
              <FormControl
                type="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large" className="form-inline">
              <FormLabel>Description: &nbsp; &nbsp;</FormLabel>
              <FormControl
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="description"
              />
            </FormGroup>
          </div>
          <br></br>
          <Button block bsSize="large" disabled={!validateForm()} type="submit" className="submitbutton">
            Create!
          </Button>
        </form>
        
      </div>
      </div>
    );
  }

