import React from 'react';
import PollTestComponent from './pollTestComponent.jsx';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000');

class App extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    return (
      <div>
        <div>Hello world!</div>
        <PollTestComponent />
      </div>
    )
  }
}

export default App;

//COMMENTING HERE FOR GIT PURPOSES