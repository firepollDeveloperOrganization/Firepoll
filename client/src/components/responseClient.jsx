import React from 'react';
import firePollManagementClient from '../firepollManagementClient'
import firePollResponseClient from '../firepollResponseClient'

class ResponseClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: false,
      questions: false,
      responses: false,
      currChoice: null
    };
  };

  componentDidMount() {

      // GET POLL & SETUP LISTENER
      firePollManagementClient.get.poll('YROTzLFtNPbhxlAGVbAx').then((data) => {
        this.setState({
          poll: data
        }, () => {
          firePollManagementClient.listen.poll(this.state.poll, (data) => {
            console.log('listening to stuff');
            this.setState({
              poll: data
            }, () => {
              firePollManagementClient.get.allQuestionsFromPoll('YROTzLFtNPbhxlAGVbAx').then((data) => {
                this.setState({
                  questions: data
                })
              }).then(() => {
                firePollManagementClient.get.allResponsesFromPoll('YROTzLFtNPbhxlAGVbAx').then((data) => {
                  this.setState({
                    responses: data
                  })
                });
              })
            });
          });
        });
      })

      // GET ALL QUESTIONS & SETUP LISTENER
      firePollManagementClient.get.allQuestionsFromPoll('YROTzLFtNPbhxlAGVbAx').then((data) => {
        this.setState({
          questions: data
        }, () => {
          firePollManagementClient.listen.question(this.state.questions, (data) => {
            firePollManagementClient.get.allQuestionsFromPoll(data.poll_id).then((data) => {
              this.setState({
                questions: data
              });
            });
          });
        });
      });

      // GET ALL RESPONSES & SETUP LISTENER
      firePollManagementClient.get.allResponsesFromPoll('YROTzLFtNPbhxlAGVbAx').then((data) => {
        this.setState({
          responses: data
        }, () => {
          firePollManagementClient.listen.response(this.state.responses, (data) => {
            firePollManagementClient.get.allResponsesFromPoll(data.poll_id).then((data) => {
              this.setState({
                responses: data
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

  handleSubmit(e) {
    e.preventDefault();

    let userAnswer = {
      answer: this.state.currChoice,
      userID: 'TEST USER ID'
    }

    firePollResponseClient.vote.submit(userAnswer).then(() => {
      console.log('Thanks for voting');
    })
  }

  render() {
    return (
    <div> 
        <h1>{this.state.poll ? this.state.poll.poll_title : ''}</h1>
      {
        this.state.questions ? this.state.questions.map(question => {
          return (<div>
            {question.question_title}
          </div>);
        }) : <div></div>
      }
      {
        <form>
          <select onChange = {(val) => {this.handleUserChoice(val)}}>
            {this.state.responses ? (this.state.responses.map((response) => {
              return (
                <option value = {response.value}>{response.value}</option>
              );
            })) : ''}
          </select>
          <button onClick = {(e) => {this.handleSubmit(e)}}>Select Answer</button>
        </form>
      }
    </div>
    );
  }
}

export default ResponseClient;