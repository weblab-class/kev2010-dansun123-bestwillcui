import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";


export default function Login(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    function validateForm() {
      return title.length > 0
    }
  
    function handleSubmit(event) {
      var path = 0
      
  
      event.preventDefault();
    }

    function cancelSubmit(event) {
        
        event.preventDefault()
    }
  
    return (
      <div className = "Full">
      <div className="Login">  
        <form onSubmit={handleSubmit}>
        
          {/* <div className = ""> */}
          <div className="right">
          <FormGroup controlId="email" bsSize="large" className="form-inline" >
            <FormLabel>Room Name: &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp; </FormLabel>
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

        <form onSubmit = {cancelSubmit}>
          <Button block bsSize="large" type="submit" className="submitbutton">
            Cancel
          </Button>
        </form>
        
      </div>
      </div>
    );
  }

