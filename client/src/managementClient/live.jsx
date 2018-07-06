import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import {firepoll, realTimeDB} from '../firepollManagementClient';
import axios from 'axios';

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      questions: [],
      closed: false
    }
    this.fetchPoll = this.fetchPoll.bind(this);
    this.computeTimeRemaining = this.computeTimeRemaining.bind(this);
  }
  componentDidMount() {
    this.fetchPoll();
  }
  fetchPoll() {
    let pollId = this.props.match.params.id;
    console.log('fetching live poll info from firebase for', pollId);
    axios.get(`/polls/${pollId}`)
    .then(res => {
      // SETTING UP LIVE DATA FLOW IF POLL IS LIVE
      if(res.data.completed === false) {
        firepoll.get.poll(pollId).then((data) => {
          this.setState({
            poll: data
          }, () => {
              firepoll.listen.poll(this.state.poll, (data) => {
                this.setState({
                  poll: data
                }, () => {
                  firepoll.get.allQuestionsFromPoll(pollId).then((data) => {
                    this.setState({
                      questions: data
                    });
                  }).catch((err) => {console.log(err)});
                });
              });
          });
        })
        // IF POLL IS COMPLETED JUST SHOW RESULTS
      } else {
        this.setState({
          closed: true
        })
      }
    })
    .catch(err => {
      console.error("retrieving poll from MongoDB", err);
    })
  };


  computeTimeRemaining() {
    // a method for figuring out how much time is remaining for a question if it's live
    let seconds = Math.floor(Math.random() * 20);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `0:${seconds}`
  }
  
  nextQuestion = (i) => {
    let questions = this.state.questions;
    questions[i].active = false;
    questions[i+1].active = true;
    this.setState({
      questions
    })
  }

  close = () => {
    let poll = this.state.poll;
    poll.questions = this.state.questions;
    axios.put(`/polls/close/${poll._id}`, poll)
    .then(res => {
      firepoll.close(poll);
      realTimeDB.ref(`/polls/${poll._id}`).remove()
      .catch(err => {
        console.error('deleting poll from realTimeDB', err)
      })
      console.log("closed poll ", poll.title);
      console.log('Saved: ', res.data);
    })
    .catch(err => {
      console.error('Closing Poll: ', err);
    })
  }


  render() {
    let {user, email} = this.props;
    console.log('loading live poll', this.state.pollId, 'for', email);
    console.log('current poll in live view:', this.state.poll);
    console.log('current questions in live view:', this.state.questions);
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
    if (!this.state.poll || !this.state.questions) return <div>LOADING POLL...</div>;
    // return <div>HI</div>
      return (
        <div style={{textAlign: "center"}}>
          <h1>🔥🔥🔥 FIRE POLL #{this.state.pollId} FOR {email} 🔥🔥🔥</h1>
            {this.state.questions.map((q, i, arr) => {
              let background = q.active ? "#A4FF8D" : "#fff";
              let visibilty = q.active ? "inline-flex": "none"; 
              return (
                <div className="box" style={{maxWidth: "900px", margin: "10px auto", backgroundColor: background}} key={q.id}>
                  <h1 className="question-question" style={{fontWeight: "700"}}>{q.question_title}</h1>
                  {/*<h3 className="question-time">{this.computeTimeRemaining()} Remains!</h3>*/}
                  <div className="question-answers">
                    {q.answers.map(ans => (
                      <p key={ans.id}>{ans.value}: {ans.position}</p>
                    )
                      )}
                  </div>
                  {i === arr.length - 1 ? 
                    <button className="button is-danger" onClick={this.close}>Close Poll</button>
                    :
                    <button className="button" style={{display: visibilty}} onClick={() => this.nextQuestion(i)}>Next Question</button>
                  }
                </div>
              )
            })}
              {this.state.closed && 
                <p style={{color: "#e83800", fontWeight: "700", margin: "30px auto"}}>This poll is closed!</p>
              }
        </div>
      )
  }
}

export default Live;