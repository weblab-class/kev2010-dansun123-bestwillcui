import React from 'react';
import logo from './logo.svg';
import './App.css';



class App extends React.Component {
  // makes props available in this component
  constructor(props) {
    super(props);

    this.socket = this.props.socket;

		this.state = {
			redirect: false,
      newGameInfo: null,
      userId: null,
    };
    

  }

  componentDidMount() {
    // pull everything from MongoDB

  }

  render() {
    return (
      <div>Yo</div>
    );
  }
}

export default App;
