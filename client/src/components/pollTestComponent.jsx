import React from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000');

class PollTestComponent extends React.Component {
  constructor(props) {
    super(props); 

    socket.on('poll created', (data) => {
      console.log('triggered client side');
      socket.emit('join poll', data.name.poll.name);
    });

  }

  sendPollToBeStaged() {
    socket.emit('stage poll',
      {
        poll : {
          name: "Nick's Poll",
          protected: {
            status: false,
            password: ''
          },
          startTrigger: {
            manual: true
          },
          executionBuckets: [
            {
              bucket: {
                order: 1,
                name: 'questionBucket#1',
                questions : [
                  {
                    order: ['integer'],
                    type: ["multiple-choice", "text-entry", "scale"],
                    prompt: "[text]",
                    answers : ["answer1, answer2"]
                  }, 
                  {
                    order: ['integer'],
                    type: ["multiple-choice", "text-entry", "scale"],
                    prompt: "[text]",
                    answers : ["answer1, answer2"]
                  }
                ]
              }
            }
          ]
        }
      });
  }

  startStagedPoll() {
    socket.emit('start poll', {
      name: "Nick's Poll"
    });
  }

  render() {
    return (
    <div>
      <div>Hello, I am to be used for testing socket functionality</div>
      <button onClick = {this.sendPollToBeStaged}>Stage Poll</button>
      <button onClick = {this.startStagedPoll}>Start Poll</button>
    </div>
    );
  }

}

export default PollTestComponent;