import React from 'react';
import { Redirect } from 'react-router-dom';

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
    if (this.props.user === 'anonymous') return <Redirect to='/login' />
      return (
        <div>
          {/*NAVBAR*/}
          <div class="topnav">
            <Link to="/dashboard"><button>Dashboard</button></Link>
            <button onClick={() => this.props.logout()}>Log Out</button>
          </div>
          {/*HEADER*/}
          <h1>Create Your Poll!</h1>
          <div className="nav">
          <h2>Logged in as {this.props.user}</h2>
          </div>
          <div id="create-poll">
            <label class="label">Poll Title:</label>
            <input type="text" placeholder="Input poll name here"/>
            {/*NEW QUESTION*/}
            <div className="new-question box">
              <h1>Question #{this.state.questions.length + 1}</h1>
              <input type="text" placeholder="Type question here" />
              <input type="text" placeholder="Type answer here to automatically populate next" />
              <button>Add Question</button>
            </div>
          </div>
          <div id="created-questions-display">

          </div>
        </div>
        
      )
  }
}

export default Create;