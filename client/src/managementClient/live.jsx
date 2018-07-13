import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import {firepoll, realTimeDB} from '../firepollManagementClient';
import axios from 'axios';
import Navbar from './navbar';

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: null,
      questions: null,
      closed: false,
      userCount: 0,
      results: []
    }
    this.fetchPoll = this.fetchPoll.bind(this);
    this.getResults = this.getResults.bind(this);
    this.computeTimeRemaining = this.computeTimeRemaining.bind(this);
  }
  componentDidMount() {
    // firepoll.user.get(this.props.match.params.id).then(data => {
    //   let userCount = 0;
    //   for (let item of data) {
    //     if (item) {
    //       userCount +=1;
    //     }
    //   }
    //   this.setState({
    //     userCount
    //   });
    // })
    // .catch(err => console.error(err))
    // (this.props.match.params.id).then((data) => {console.log(data)});
    this.fetchPoll();

  }

  getResults() {
    console.log('getting results');
    console.log(this.state.questions);
    for (let question of this.state.questions) {
      firepoll.getResults(this.state.poll._id, question._id)
      .then((data) => {
        console.log('firepoll results', data)
      })
      .catch(err => console.log('firepoll results error', err));
      // firepoll.listenToResults(this.state.poll._id, question._id, (data) => {
      //   console.log(data);
      // });
    }
  }

  fetchPoll() {
    let pollId = this.props.match.params.id;
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
                    }, () => this.getResults());
                  })
                  // .catch((err) => {console.log(err)});
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
    firepoll.updateQuestion(this.state.poll._id, questions[i]._id, {active: false})
    firepoll.updateQuestion(this.state.poll._id, questions[i+1]._id, {active: true})
    this.setState({
      questions
    });
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
    }).then(() => {
      this.props.history.push('/dashboard');
    })
    .catch(err => {
      console.error('Closing Poll: ', err);
    })
  }

  render() {
    let {user, email} = this.props;
    if (!user) {
      setTimeout(() => {
        if (!this.props.user) {
          this.props.history.push('/login');
        }}, 2000);
      return (
        <div id = "live-view">
          <div className = "loading-view">
            <div className = "loading-container">
              <svg className = "loader-rotate" height = "100" width = "100">
                <circle cx="50" cy="50" r="40" />
              </svg>
              <div className = "loading-text"></div>
            </div>
          </div>
        </div>
        );
    } else if (this.props.user && !this.state.signedIn) {
      setTimeout(() => {
        this.setState({
          signedIn: true
        })}, 1510);
    
      if (!this.state.poll || !this.state.questions) return (
        <div id = "live-view">
          <div className = "loading-view">
            <div className = "loading-container">
              <svg className = "loader-rotate" height = "100" width = "100">
                <circle cx="50" cy="50" r="40" />
              </svg>
              <div className = "loading-text"></div>
            </div>
          </div>
        </div>
        );
      return (
        <div id = "live-view" className="live-view-wrapper" style={{textAlign: "center"}}>
        <Navbar />
          <h1 className = 'poll-title'>Live View - Poll: {this.state.poll.title}</h1>
            {this.state.questions.map((q, i, arr) => {
              return (
                <div className="box" key={q.id}>
                  <h1 className="question-question">Q: {q.question_title}</h1>
                  <div className = "question-answers-container">
                    <div className="question-answers">
                      {q.answers.map(ans => (
                        <p key={ans.id}>A{ans.position}:   {ans.value}</p>
                      )
                        )}
                    </div>
                      {
                        i === arr.length - 1 ? 
                        <div className = "button-container">
                          <button className="draw meet id=" onClick={() => this.nextQuestion(i)}>Next Question</button>
                          <button className="draw meet" id="closePollButton" onClick={this.close}>Close Poll</button>
                        </div>
                        :
                        <button className="draw meet id=" onClick={() => this.nextQuestion(i)}>Next Question</button>
                      }
                    </div>
                </div>
              )
            })}
              {this.state.closed && 
                <p className="pollIsClosedAlert" style={{color: "#e83800", fontWeight: "700", margin: "30px auto"}}>This poll is closed!</p>
              }
          <div id="live-results-container">LIVE RESULTS POPULATE HERE</div>
        </div>
      );

    }
  }
}

export default Live;