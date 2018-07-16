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
      results: null,
      fetchedLive: false
    }
    this.fetchPoll = this.fetchPoll.bind(this);
    this.getResults = this.getResults.bind(this);
    this.computeTimeRemaining = this.computeTimeRemaining.bind(this);
  }
  componentDidMount() {
    this.fetchPoll();
  }

  getResults() {
    if (!this.state.fetchedLive) {
      for (let question of this.state.questions) {
        realTimeDB.ref(`/polls/${this.state.poll._id}/questions/${question._id}/aggregates`).on('value', snapshot => {
          let data = snapshot.val();
          console.log('got my live data', data);
          let ansObj = {};
          for (let ans of question.answers) {
            ansObj[ans.value] = ansObj[ans.value] || 0;
          }
          if (data) {
            for (let ans of Object.keys(data)) {
              console.log('answer of data', ans)
              ansObj[data[ans].answer_value] = data[ans].vote_count;
            }
          }
          // let results = this.state.results || {};
          let results = Object.assign({}, this.state.results);
          results[question._id] = ansObj;
          console.log('current ans obj', ansObj);
          console.log('current results obj', results);
          console.log('this', this);
          // this.setState({results: results}, () => console.log('CURRENT STATE RESULTS', this.state.results));
          this.setState({results}, () => console.log('SET STATE!', this.state.results));
          this.state({fetchedLive: true});
        });
      }
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
    let r = this.state.results;
    let resultsDiv = !r ? <div>Wait for results!</div> : this.state.questions.map(q => (
    <div key={q._id}>
      <h2>{q.question_title}</h2>
      {q.answers.map(ans => <h3 key={ans.value}>{ans.value} : {r[q._id][ans.value]}</h3>)}
    </div>
    ));

    // const renderResults = () => {
    //   if (r) {
    //     return (
    //       this.state.questions.map(q => (
    //         <div key={q._id}>
    //           <h2>{q.question_title}</h2>
    //           {q.answers.map(ans => <h3>{ans.value} : {r[q._id][ans.value]}</h3>)}
    //         </div>
    //     )
    //   }
    // }
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
<<<<<<< HEAD
        return (
          <div id = "live-view" className="live-view-wrapper" style={{textAlign: "center"}}>
            <Navbar history = {this.props.history}/>
            <div className = "live-view-container"> 
              <h1 className = 'poll-title'>Live View - Poll: {this.state.poll.title}</h1>
                {this.state.questions.map((q, i, arr) => {
                  console.log(q.active);
                  return (
                    <div className={"box"} key={q.id}>
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
            </div>
              <div id="live-results-container">
                <h1 className = "poll-results-title">{this.state.poll.title} - Results</h1>
                {resultsDiv}
              </div>
=======
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
>>>>>>> dev
          </div>
        );
  

    }
  }
}



export default Live;

    // console.log(this.state.questions);

    // for (let question of this.state.questions) {
    //   // console.log('AYYYYYYYYY',question);
    //   firepoll.getResults(this.state.poll._id, question._id)
    //   .then((data) => {
    //     console.log('firepoll results', data);
    //     let answers = [];
    //     data.forEach(ans => answers.push({answer_value, vote_count}));
    //     let resultsObj = {question: question.question_title, answers};
    //     let currentResults = this.state.results;
    //     currentResults.push(resultsObj);
    //     this.setState({results: currentResults});
    //   })
    //   .catch(err => console.log('firepoll results error', err));
    //   // firepoll.listenToResults(this.state.poll._id, question._id, (data) => {
    //   //   console.log(data);
    //   // });
    // }
        // for (let question of this.state.questions) {
    //   firepoll.getResults(this.state.poll._id, question._id).then((data) => {
    //     let newResults = Object.assign({}, this.state.results);
    //     newResults[question._id] = data;
    //     this.setState({
    //       results: newResults
    //     }, () => console.log('results', this.state.results));
    //   });
    //   firepoll.listenToResults(this.state.poll._id, question._id, (data) => {
    //     let newResults = Object.assign({}, this.state.results);
    //     newResults[question._id] = data;
    //     this.setState({
    //       results: newResults
    //     }, () => console.log('new results', this.state.results));
    //   });
    // }
          // console.log('dskfljsdf', question);
      // firepoll.getLiveResults(this.state.poll._id, question._id)
      // .then(data => {
      //   console.log('GOT FRESH DATA FROM FIREPOLL', data);
      //   let ansObj = {};
      //   for (let ans of question.answers) {
      //     ansObj[ans.value] = ansObj[ans.value] || 0;
      //   }
      //   for (let ans of data) {
      //     // console.log('answer of data', ans)
      //     ansObj[ans.answer_value] = ans.vote_count;
      //   }
      //   // let results = {[question._id]: ansObj}
      //   let results = this.state.results || {};
      //   results[question._id] = ansObj;
      //   this.setState({results}, () => console.log('current results', this.state.results));
      // })
      // .catch(err => console.log(err));

      // firepoll.getLiveResults(this.state.poll._id, question._id, data => {
      //   console.log('got my live data', data);
      //   let ansObj = {};
      //   for (let ans of question.answers) {
      //     ansObj[ans.value] = ansObj[ans.value] || 0;
      //   }
      //   if (data) {
      //     for (let ans of Object.keys(data)) {
      //       console.log('answer of data', ans)
      //       ansObj[data[ans].answer_value] = data[ans].vote_count;
      //     }
      //   }
      //   // let results = {[question._id]: ansObj}
      //   let results = this.state.results || {};
      //   console.log('current results obj', results);
      //   results[question._id] = ansObj;
      //   console.log('current ans obj', ansObj);
      //   console.log('this', this);
      //   this.setState({results}, () => console.log('CURRENT STATE RESULTS', this.state.results));
      //   this.forceUpdate();
      // })
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