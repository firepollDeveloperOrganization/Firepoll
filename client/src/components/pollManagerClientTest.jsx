import React from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000');

class PollTestComponent extends React.Component {
  constructor(props) {
    super(props); 
  }


// Add function to get poll [HTTP]
// Add function to create a poll [HTTP]
// Add function to update a poll [HTTP]
// Add function to delete a poll [HTTP]

// Add function to stage poll [HTTP] --> pollManager [sockets.io] --> pollRunner

// Add function to start poll [sockets.io] - 'Start Poll'
// Add function to release question [sockets.io] - 'Release Question'
// Add function to get current stats [sockets.io] - 'Get Stats'


  render() {
    return (
    <div>
      <div>Hello, I am to be as a test manager for live poll functionality</div>
      <button>Stage Poll</button>
      <button>Start Poll</button>
      <button>End Poll</button>
      <button>Release Question</button>
      <button>Get Analytics</button>
    </div>
    );
  }

}

export default PollTestComponent;