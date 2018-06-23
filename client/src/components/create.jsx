import React from 'react';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollname: '',
      questions: [],
      currentQuestion: '',
      answers: []
    };
  }
  sendPoll() {
    console.log(this.state.pollname);
    //then reset current poll
    //then redirect to dashboard
  }
  addQuestion() {
    console.log('adding question to poll', this.state.pollname);
  }
  addAnswer() {
    console.log('adding answer to question');
  }
  render() {
      return (
        <div>
          <h1>Create Your New Poll!</h1>
          <div className="nav">
            <button>Dashboard</button>
            <button>Log Out</button>
          </div>
          <div id="create-poll">
            <input type="text" placeholder="Input poll name here"/>
            <h1>Question #{this.state.questions.length + 1}</h1>
            <input type="text" placeholder="Type question here" />
            <input type="text" placeholder="Type answer here to automatically populate next" />
            <button>Add Question</button>
          </div>
          <div id="created-questions-display">

          </div>
        </div>
        
      )
  }
}

export default Create;