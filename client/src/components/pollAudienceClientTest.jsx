import React from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000');

class PollTestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

// Add function to subscribe to poll [SOCKETS.IO] - 'Sub Poll'
// Add function to unsubscribe from poll [SOCKETS.IO] - 'UnSub Poll'
// Add function to submit answer [SOCKETS.IO] - 'Sub Answer' ** NOTE SHOULD INCLUDE ANSWER AND UNIQUE IDENTIFIER FOR USER // Overwrite on duplicate
// Add function to request poll resend [SOCKETS.IO] - 'Get Poll'
// Add function to get stats [SOCKETS.IO] - 'Get Stats'

// Add listener for question release [SOCKETS.IO] - 'Release Question'
// Add listener for end of poll [SOCKETS.IO] - 'Poll End'


  render() {
    return (
    <div>
      <div>Hello, I am to be used as a test audience for live poll functionality</div>
      <button>Subscribe to poll</button>
      <button>Unsubscribe from</button>
      <button>Submit answer</button>
      <button>Get last question</button>
    </div>
    );
  }

}

export default PollTestComponent;