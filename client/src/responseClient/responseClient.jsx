import React from 'react';
import firePollResponseClient from '../firepollResponseClient.js';
import MultipleChoiceQuestion from './multipleChoiceQuestion.jsx';
import QuestionIntro from './questionIntro.jsx';

class ResponseClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollComplete: 0,
      currQuestion: 0,
      poll: false,
      questions: false,
      answers: false,
      currChoice: 1,
      results: false,
      user_id: 1,
      exists: true,
      loading: true,
      active: false,
      completed: false,
      questionIntroLeave: false,
      reveal: false,
    };
    this.handleUserChoice = this.handleUserChoice.bind(this);
  };

  componentDidMount() {

      var pollId = window.location.pathname.slice(10);

      let currQuestion = window.localStorage.getItem(pollId);
      if (currQuestion) {
        this.setState({
          currQuestion: parseInt(window.localStorage.getItem(pollId))
        })
      }

      // SIGN IN
      firePollResponseClient.user.signin(this.state.user_id, pollId);

      // CHECK POLL STATUS
      firePollResponseClient.get.pollStatus(pollId).then((data) => {

        if (data === undefined) {
          this.setState({
            loading: false,
            active: false,
            completed: false,
            exists: false,
          });
        }
        
        else if (data) {
          this.setState(
            {
              active: data.active,
              complete: data.completed,
              loading: false
            }
          )     
        
          // GET POLL & SETUP LISTENER
          firePollResponseClient.get.poll(pollId).then((data) => {
            this.setState({
              poll: data
            }, () => {
              firePollResponseClient.listen.poll(this.state.poll, (data) => {
                this.setState({
                  poll: data
                }, () => {
                  firePollResponseClient.get.allQuestionsFromPoll(pollId).then((data) => {
                    this.setState({
                      questions: data,
                      currChoice: JSON.stringify(data[this.state.currQuestion].answers[0])
                    });
                  }).catch((err) => {console.log(err)});
                });
              });
            });
          }).catch((err) => {console.log(err)})

          // GET ALL QUESTIONS & SETUP LISTENER
          firePollResponseClient.get.allQuestionsFromPoll(pollId).then((data) => {
            this.setState({
              questions: data
            }, () => {
              firePollResponseClient.listen.question(this.state.poll._id, this.state.questions, () => {
                firePollResponseClient.get.allQuestionsFromPoll(this.state.poll._id).then((data) => {
                  this.setState({
                    questions: data
                  }, () => {
                    if (currQuestion > this.state.questions.length - 1) {
                      this.setState({
                        pollComplete: true
                      });
                    }
                  });
                });
              });
            });

            // GET RESULTS IF USER HAS ALREADY COMPLETED CURRENT QUESTION
            if (this.state.currQuestion > this.state.questions.length-1) {
              for (let question of this.state.questions) {
                firePollResponseClient.get.results(this.state.poll._id, question._id).then((data) => {
                  let newResults = Object.assign({}, this.state.results);
                  newResults[question._id] = data;
                  this.setState({
                    results: newResults
                  });
                });
                firePollResponseClient.listen.results(this.state.poll._id, question._id, (data) => {
                  let newResults = Object.assign({}, this.state.results);
                  newResults[question._id] = data;
                  this.setState({
                    results: newResults
                  });
                });
              }
            }

          }).then(() => {
            if (this.state.questions && this.state.questions[this.state.currQuestion].active === true) {
              var duration = this.state.questions[this.state.currQuestion].question_title.length * 200;
              duration = duration > 8000 ? 8000 : duration; 
              setTimeout(() => {this.setState({questionIntroLeave: true})}, duration);
              setTimeout(() => {this.setState({reveal: true})}, duration + 1000);
            }
          });
          } else {
            this.setState({exists: false})
          }
      });

  };

  handleUserChoice(response) {
    console.log(response);
    this.setState({
      currChoice: response
    });
  }

  testCloudFunction() {
    firePollResponseClient.testCloudFunction();
  }

  handleSubmit(e, question) {
    e.preventDefault();

    const answer = JSON.parse(this.state.currChoice);

    this.setState({user_id: this.state.user_id+1});
    let userAnswer = {
      poll_id: this.state.poll._id,
      answer_id: answer.id,
      answer_value: answer.value,
      user_id: this.state.user_id,
      question_id: question._id,
      question_title: question.question_title,
      question_type: question.type,
      reveal: false,
      questionIntroLeave: false,
    }

    this.setState({
      currQuestion: this.state.currQuestion + 1,
      pollComplete: this.state.currQuestion + 1 > this.state.questions.length - 1
    }, () => {
      window.localStorage.setItem(this.state.poll._id, this.state.currQuestion)
    });

    firePollResponseClient.get.results(this.state.poll._id, question._id).then((data) => {
      let newResults = Object.assign({}, this.state.results);
      newResults[question._id] = data;
      this.setState({
        results: newResults
      });
    });

    firePollResponseClient.listen.results(this.state.poll._id, question._id, (data) => {
      let newResults = Object.assign({}, this.state.results);
      newResults[question._id] = data;
      this.setState({
        results: newResults
      });
    });

    firePollResponseClient.vote.submit(userAnswer).then(() => {
      console.log('Thanks for voting');
    })
  }

  // GETS RENDERED IF POLL IS LIVE
  renderLivePoll = () => {
    return (
    <div id="poll-dist" className = "poll-dist-class">
      {this.state.pollComplete ? '' : this.state.poll ? <div className = "response-form">
        { this.state.questions ? this.state.questions.filter((ele, i) => i === this.state.currQuestion).map((question) => {
            if (question.active) {
              return (this.state.reveal ?
                <div className = "question-container"> 
                  <MultipleChoiceQuestion currChoice = {this.state.currChoice} question = {question} handleUserChoice = {this.handleUserChoice} handleSubmit = {(e, question) => this.handleSubmit(e, question)}/>
                  <button className="draw meet submit" onClick = {(e) => {this.handleSubmit(e, question)}}>Submit</button>
                </div>: 
                <QuestionIntro question = {question} questionIntroLeave = {this.state.questionIntroLeave}/>);
            } else {
              return (
                <div className = "question-container">
                  <div className = "loader"></div>
                  <div className = "status">Waiting for next question...</div>
                </div>
              );
            }
          })
          : <div></div>
        }
      </div> : ''}

        { 
          this.state.pollComplete ? 
          <div className = "response-form">
            <div className = "question-container">
            <h1 className = "poll-results-title">{this.state.poll.title} - Results</h1>
                {this.state.results ? Object.keys(this.state.results).map((id) => {
                  let questionForResults = this.state.questions.filter(question => id === question._id)[0];
                  return (
                    <div className = "question-result-container">
                      <div className = "question-result-title">{questionForResults.question_title}</div>
                        {questionForResults.answers.map((answer) => {
                          let total = this.state.results[id].filter(result => result.question_id === questionForResults._id).reduce((acc, result) => acc += result.vote_count, 0);
                          let results = this.state.results[id].filter(result => result.answer_id === answer.id);
                          let resultVotes = results.length > 0 ? results[0].vote_count : 0;
                          let resultStyle = {
                            width: `${resultVotes/ total * 100}%`
                          }
                          if (results.length > 0) {
                            return (
                            <div style = {resultStyle} className = "result-interactive">
                              <span className = "result-overflow">{results[0].answer_value}</span>
                              <span className = "result-overflow">{results[0].vote_count}</span>
                            </div>
                            );
                          } else {
                            return (
                            <div className = "result-interactive not-yet">
                              <span className = "result-overflow">No votes yet!</span>
                            </div>
                            );
                          }
                        })}
                    </div>
                  )
                }):''} 
              </div>
          </div>
          :''
        }
    </div>
    );
  }

  render() {
    if(this.state.active) {
      return this.renderLivePoll();
    } else {
      if (this.state.loading === true) {
        var status = "LOADING ...";
        var loader = true;
      } else {
        let isScheduledText = "This poll is not yet live. Please wait for the host to start the poll and refresh this page.";
        let doesNotExistText = "We can't find the poll you are looking for. Try checking the link for typos.";
        let isCompleteText = "This poll is complete. Thank you for participating.";
        var status = this.state.exists === false ? doesNotExistText : this.state.complete === true ? isCompleteText : isScheduledText;
      }
      return (
      <div id = "poll-dist" className = "poll-dist-class">
        <div className = "response-form">
          <div className = "question-container with-status">
            <svg className = "loader-rotate" height = "80" width = "80">
              <circle cx="40" cy="40" r="32" />
            </svg>
            <p className = "status">{status}</p>
          </div>
        </div>
      </div>
      ) 
    }
  }
}

export default ResponseClient;