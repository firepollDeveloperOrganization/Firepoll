import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import dummypolls from './dummydata';

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: this.props.location.pathname.slice(6),
      poll: null
    }
    this.fetchPoll = this.fetchPoll.bind(this);
    this.computeTimeRemaining = this.computeTimeRemaining.bind(this);
  }
  componentDidMount() {
    this.fetchPoll();
  }
  fetchPoll() {
    console.log('fetching live poll info from firebase for', this.state.pollId);
    // check that user is the owner of that poll, if not, offer up the voting link for the poll instead
    // if user is owner, take the retrieved poll and set it onto the state
    // this.setState({poll: data});
    this.setState({poll: dummypolls[1]});
  }
  computeTimeRemaining() {
    // a method for figuring out how much time is remaining for a question if it's live
    let seconds = Math.floor(Math.random() * 20);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `0:${seconds}`
  }
  
  render() {
    let {user, email} = this.props;
    console.log('loading live poll', this.state.pollId, 'for', email);
    console.log(this.state.poll);
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
    if (!this.state.poll) return <div>LOADING FIRE POLL!</div>;
      return (
        <div>
          <h1>🔥🔥🔥 FIRE POLL #{this.state.pollId} FOR {email} 🔥🔥🔥</h1>
          <div>
            {this.state.poll.questions.map(q => (
                <div key={q.questionId}>
                  <h1 className="question-question">{q.question}</h1>
                  <h3 className="question-time">{this.computeTimeRemaining()} Remains!</h3>
                  <button>START VOTING!</button>
                  <button>STOP VOTING!</button>
                  {/* <button>NEXT QUESTION!</button> */}
                  <div className="question-answers">
                    {q.answers.map(ans => (
                      <p key={ans.choiceId}>{ans.choice}: {ans.votes}</p>
                    )
                      )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )
  }
}

export default Live;