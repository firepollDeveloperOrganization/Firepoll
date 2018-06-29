import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import dummypolls from './dummydata';
import firePollManagementClient from '../firepollManagementClient';

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: this.props.location.pathname.slice(6),
      poll: null,
      questions: null
    }
    this.fetchPoll = this.fetchPoll.bind(this);
    this.computeTimeRemaining = this.computeTimeRemaining.bind(this);
  }
  componentDidMount() {
    this.fetchPoll();
  }
  fetchPoll() {
    let pollId = this.state.pollId;
    console.log('fetching live poll info from firebase for', this.state.pollId);
    firePollManagementClient.get.poll(pollId).then((data) => {
      this.setState({
        poll: data
      }, () => {
        firePollManagementClient.listen.poll(this.state.poll, (data) => {
          this.setState({
            poll: data
          }, () => {
            firePollManagementClient.get.allQuestionsFromPoll(pollId).then((data) => {
              this.setState({
                questions: data
              });
            }).catch((err) => {console.log(err)});
          });
        });
      });
    })
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
    console.log('current poll in live view:', this.state.poll);
    console.log('current questions in live view:', this.state.questions);
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
    if (!this.state.poll || !this.state.questions) return <div>LOADING FIRE POLL!</div>;
    // return <div>HI</div>
      return (
        <div>
          <h1>🔥🔥🔥 FIRE POLL #{this.state.pollId} FOR {email} 🔥🔥🔥</h1>
          <div>
            {this.state.questions.map(q => (
                <div key={q.id}>
                  <h1 className="question-question">{q.question_title}</h1>
                  <h3 className="question-time">{this.computeTimeRemaining()} Remains!</h3>
                  <button>START VOTING!</button>
                  <button>STOP VOTING!</button>
                  <div className="question-answers">
                    {q.answers.map(ans => (
                      <p key={ans.id}>{ans.value}: {ans.position}</p>
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