import React from 'react';
import ip from 'ip';
import {firepoll} from '../firepollManagementClient'
import firePollResponseClient from '../firepollResponseClient'

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
      user_id: 1
    };
  };

  componentDidMount() {

      // GET POLL & SETUP LISTENER
      var pollUniqueKey = this.props.location.pathname.slice(10);

      firepoll.get.poll(pollUniqueKey).then((data) => {
        this.setState({
          poll: data
        }, () => {
          firepoll.listen.poll(this.state.poll, (data) => {
            this.setState({
              poll: data
            }, () => {
              firepoll.get.allQuestionsFromPoll(pollUniqueKey).then((data) => {
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
      firepoll.get.allQuestionsFromPoll(pollUniqueKey).then((data) => {
        this.setState({
          questions: data
        }, () => {
          firepoll.listen.question(this.state.poll.id, this.state.questions, () => {
            firepoll.get.allQuestionsFromPoll(this.state.poll.id).then((data) => {
              this.setState({
                questions: data
              });
            });
          });
        });
      });
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
    });

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

  render() {
    return (
    <div id="poll-dist" className = "poll-dist-class">
      {/* <button onClick = {() => {this.testCloudFunction()}}>TEST</button> */}
      {this.state.pollComplete ? '' : this.state.poll ? <div>
          <h1 className="title is-4">{this.state.poll.title}</h1>
        { 
          this.state.questions ? this.state.questions.filter((ele, i) => i === this.state.currQuestion).map((question) => {
              return (<div>
                  <div className="title is-3">{question.question_title}</div>
                    <form className="field control flex" key={question.id}>
                      <select className="is-multiple is-danger is-medium" size = {question.answers.length} onChange = {(val) => {this.handleUserChoice(val)}}>
                        {question.answers.map((answer, i) => {
                          return (
                            <option key={i} value = {JSON.stringify(answer)}>{answer.value}</option>
                          );
                        })}
                      </select>
                      <button className="button is-danger is-rounded is-medium" onClick = {(e) => {this.handleSubmit(e, question)}}>Select Answer</button>
                  </form>
                </div>);
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
                  <div>
                    <h2 className = "title is-5">{questionForResults[0].question_title}</h2>
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

        {/* {
          this.state.results ? Object.keys(this.state.results).map((resultSetKey) => {
            return this.state.results[resultSetKey].map((resultSet) => {
              resultSet.map((result) => {
                let total = this.state.results[result.question_id].reduce((acc, ele) => acc + ele.vote_count, 0);
                const isLit = '🔥'.repeat(Math.floor(result.vote_count / total *10));
                return (
                  <div className = "title is-5 flex results">
                      <span>{result.answer_value}</span>
                      <span>{isLit}</span>
                      <span>{result.vote_count}</span>
                  </div>
                )}
                )
            });
          }) : ''
        } */}
    </div>
    );
  }
}

export default ResponseClient;