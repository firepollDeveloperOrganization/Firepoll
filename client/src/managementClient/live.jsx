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
      userCount: 0
    }
    this.fetchPoll = this.fetchPoll.bind(this);
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
    // }).catch(err => console.error(err))
    // (this.props.match.params.id).then((data) => {console.log(data)});
    this.fetchPoll();
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
                    });
                  }).catch((err) => {console.log(err)});
                });
              });
          });
        }).catch(() => {
          this.fetchPoll();
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
    let questions = this.state.questions.slice();
    questions[i].active = false;
    questions[i+1].active = true;
    firepoll.updateQuestion(this.state.poll._id, questions[i]._id, {active: false})
    firepoll.updateQuestion(this.state.poll._id, questions[i+1]._id, {active: true})
    this.setState({
      questions
    });
  }

  close = () => {
    this.setState({closed: true})
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
      setTimeout(() => {
        this.props.history.push('/dashboard');
      }, 400)
      
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
        <div className="live-view">
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
    } else if (this.props.user) {
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
        <div className="body-wrapper">
          <div className="container">
            <Navbar history = {this.props.history}/>
            <div className="live-view__container"> 
              <h1 className='live-view__poll-title'>Live Poll: "{this.state.poll.title}"</h1>
              <div className="u-horizontal-divider u-horizontal-divider--red u-margin-bottom-medium"></div>
                {this.state.questions.map((q, i, arr) => {
                  let border;
                  if(q.active === true) { border = '2px solid rgb(0, 255, 0)'};
                  return (
                    <div className="live-view__question-box" style = {{border: border}} key={q.id}>
                      <div className="live-view__question-title">{q.question_title}</div>
                      <hr className="hr--solid--red"/>
                      <div className="live-view__answers-box">
                        <ul className="live-view__answers-list">
                          {q.answers.map(ans => (
                            <li className="live-view__answer" key={ans.id}>{ans.value}</li>
                          )
                            )}
                        </ul>
                          {q.active === true && i !== arr.length -1 && 
                            <button className="btn--standard" id="nextQuestionButton" onClick={() => this.nextQuestion(i)}>Next Question</button>
                          }
                          {i === arr.length -1 &&
                          <button className="btn--standard" id="closeQuestionButton" onClick={this.close}>Close Poll</button>
                          }
                        </div>
                    </div>
                  )
                })}
                {this.state.closed && 
                  <p className="pollIsClosedAlert" style={{color: "#e83800", fontWeight: "700", margin: "30px auto"}}>This poll is now closed!</p>
                }
            </div>
          </div>
        </div>
      );

    }
  }
}

export default Live;