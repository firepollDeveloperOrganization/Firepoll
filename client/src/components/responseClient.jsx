import React from 'react';
import ip from 'ip';
import firePollManagementClient from '../firepollManagementClient'
import firePollResponseClient from '../firepollResponseClient'

class ResponseClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: false,
      questions: false,
      answers: false,
      currChoice: 1,
      alreadyVoted: false,
      results: false
    };
  };

  componentDidMount() {

      // GET POLL & SETUP LISTENER
      var pollUniqueKey = this.props.location.pathname.slice(10);

      firePollManagementClient.get.poll(pollUniqueKey).then((data) => {
        this.setState({
          poll: data
        }, () => {
          firePollManagementClient.listen.poll(this.state.poll, (data) => {
            this.setState({
              poll: data
            }, () => {
              firePollManagementClient.get.allQuestionsFromPoll(pollUniqueKey).then((data) => {
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
      firePollManagementClient.get.allQuestionsFromPoll(pollUniqueKey).then((data) => {
        this.setState({
          questions: data
        }, () => {
          firePollManagementClient.listen.question(this.state.poll.id, this.state.questions, () => {
            firePollManagementClient.get.allQuestionsFromPoll(this.state.poll.id).then((data) => {
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

  handleSubmit(e, question) {
    e.preventDefault();

    const answer = JSON.parse(this.state.currChoice);

    let userAnswer = {
      poll_id: this.state.poll.id,
      answer_id: answer.id,
      answer_value: answer.value,
      user_id: this.props.userId || ip.address().replace(/./g , "newchar"),
      question_id: question.id,
      question_title: question.title,
      question_type: question.type
    }

    if (this.state.alreadyVoted === false) {
      this.setState({
        alreadyVoted: true
      });
    }

    firePollResponseClient.get.results(this.state.poll.id, question_id).then((data) => {
      this.setState({
        results: data
      });
    });

    firePollResponseClient.listen.results(this.state.poll.id, question_id, (data) => {
      this.setState({
        results: data
      });
    });

    firePollResponseClient.vote.submit(userAnswer).then(() => {
      console.log(userAnswer);
      console.log('Thanks for voting');
    })
  }

  render() {
    return (
    <div id="poll-dist" className = "poll-dist-class">
    {this.state.poll ? <div>
        <h1 className="title is-4">{this.state.poll.title}</h1>
      { 
        this.state.questions ? this.state.questions.map((question) => {
          return (
            <div>
              <div className="title is-3">{question.question_title}</div>
              <form className="field control flex" key={question.id}>
                <select className="select is-danger is-rounded is-medium" onChange = {(val) => {this.handleUserChoice(val)}}>
                  {question.answers.map((answer, i) => {
                    return (
                      <option key={i} value = {JSON.stringify(answer)}>{answer.value}</option>
                    );
                  })}
                </select>
              {this.state.alreadyVoted ? <div></div> : <button className="button is-danger is-rounded is-medium" onClick = {(e) => {this.handleSubmit(e, question)}}>Select Answer</button>}
            </form>

            </div>
            );
        })
        : <div></div>
      }
      {
        this.state.results ? this.state.results.map((result) => {
          let total = this.state.results.reduce((acc, ele) => acc + ele.vote_count, 0);
          const isLit = '🔥'.repeat(Math.floor(result.vote_count / total *10));
          return (
          <div className = "title is-5 flex results">
              <span>{result.answer_value}</span>
              <span>{isLit}</span>
              <span>{result.vote_count}</span>
          </div>
          )}
        ) : <div></div>
      }
    </div> : ''}
    </div>
    );
  }
}

export default ResponseClient;