import React from 'react';
import firePollResponseClient from '../firepollResponseClient'
import MultipleChoiceQuestion from './multipleChoiceQuestion';

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
      completed: false
    };
  };

  componentDidMount() {
      var pollId = this.props.match.params.id;
      console.log("pollID: ", pollId);

      let currQuestion = localStorage.getItem(this.state.poll_id);
      if (currQuestion) {
        this.setState({
          currQuestion: parseInt(localStorage.getItem(this.state.poll_id))
        })
      }

      // CHECK POLL STATUS
      firePollResponseClient.get.pollStatus(pollId).then((data) => {
        if (data !== undefined) {
          this.setState({
            loading: false,
            active: data.active,
            completed: data.completed
          })        
        
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
                      currChoice: JSON.stringify(data[0].answers[0])
                    });
                  }).catch((err) => {console.log(err)});
                });
              });
            });
          })

          // GET ALL QUESTIONS & SETUP LISTENER
          firePollResponseClient.get.allQuestionsFromPoll(pollId).then((data) => {
            this.setState({
              questions: data
            }, () => {
              firePollResponseClient.listen.question(this.state.poll.id, this.state.questions, () => {
                firePollResponseClient.get.allQuestionsFromPoll(this.state.poll.id).then((data) => {
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
          });
        } else {
          this.setState({exists: false})
        }
      })
  };

  handleUserChoice(response) {
    this.setState({
      currChoice: response.target.value
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
      poll_id: this.state.poll.id,
      answer_id: answer.id,
      answer_value: answer.value,
      user_id: this.state.user_id,
      question_id: question.id,
      question_title: question.question_title,
      question_type: question.type
    }

    this.setState({
      currQuestion: this.state.currQuestion + 1,
      pollComplete: this.state.currQuestion + 1 > this.state.questions.length - 1
    }, () => {localStorage.setItem(this.state.poll_id, this.state.currQuestion)});

    firePollResponseClient.get.results(this.state.poll.id, question.id).then((data) => {
      let newResults = Object.assign({}, this.state.results);
      newResults[question.id] = data;
      this.setState({
        results: newResults
      });
    });

    firePollResponseClient.listen.results(this.state.poll.id, question.id, (data) => {
      let newResults = Object.assign({}, this.state.results);
      newResults[question.id] = data;
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
      {/* <button onClick = {() => {this.testCloudFunction()}}>TEST</button> */}
      {this.state.pollComplete ? '' : this.state.poll ? <div>
          <h1 className="title is-4">{this.state.poll.title}</h1>
        { 
          this.state.questions ? this.state.questions.filter((ele, i) => i === this.state.currQuestion).map((question) => {
            return (
                <MultipleChoiceQuestion question = {question} handleSubmit = {(e, question) => this.handleSubmit(e, question)}/>
              );
          })
          : <div></div>
        }
      </div> : ''}

        { 
          this.state.pollComplete ? 
          <div>
            <h1 className = "title is-4">{this.state.poll.title} Results</h1>
              {this.state.results ? Object.keys(this.state.results).map((id) => {
                let questionForResults = this.state.questions.filter(question => id === question.id)
                return (
                  <div className = "results-container">
                    <h2 className = "result-title title is-5">{questionForResults[0].question_title}</h2>
                    {this.state.results[id].map((result) => {
                    let total = this.state.results[result.question_id].reduce((acc, ele) => acc + ele.vote_count, 0);
                    const isLit = '🔥'.repeat(Math.floor(result.vote_count / total *10));
                    return (
                      <div className = "title is-5 flex results">
                        <span>{result.answer_value}</span>
                        <span>{isLit}</span>
                        <span>{result.vote_count}</span>
                      </div>)
                    })}
                  </div>
                )
              }):''} 
            </div>
          :''
        }
    </div>
    );
  }

  render() {
    if(true) {
      return this.renderLivePoll();
    } else {
      if (this.state.loading === true) {
        var status = "LOADING ...";
      } else {
        let isScheduledText = "This poll is not yet live. Please wait for the host to start the poll and refresh this page.";
        let doesNotExistText = "We can't find the poll you are looking for. Try checking the link for typos.";
        let isCompleteText = "This poll is complete. Thank you for participating.";
        var status = this.state.exists === false ? doesNotExistText : this.state.completed === true ? isCompleteText : isScheduledText;
      }
      return (
      <div className="responseClient" style={{margin: "40px 0 0 0"}}>
        <div className="box" style={{maxWidth: "600px", minHeight: "600px", margin: "0 auto", textAlign: "center"}} id="app">
          <p>{status}</p>
        </div>
      </div>
      ) 
    }
  }
}

export default ResponseClient;