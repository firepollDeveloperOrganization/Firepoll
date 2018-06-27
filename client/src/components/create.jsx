import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import CreatedQuestions from './createdQuestions.jsx'

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollname: '',
      questions: [],
      currentQuestion: '',
      currentAnswer: '',
      answers: []
    };
    this.sendPoll = this.sendPoll.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  sendPoll() {
    console.log(this.state.pollname);
    //then reset current poll
    //then redirect to dashboard
  }

  addQuestion() {
    console.log('addQuestion runs');
    var newQuestion = {
      question: this.state.currentQuestion,
      answers: this.state.answers
    }
    var allQuestions = this.state.questions;
    allQuestions.push(newQuestion);
    console.log(allQuestions);
    this.setState({
      answers: [],
      currentQuestion: '',
      currentAnswer: '',
      questions: allQuestions
    })
  }
  
  addAnswer(e) {
    e.preventDefault();
    let newAnswerArray = this.state.answers;
    newAnswerArray.push(this.state.currentAnswer);
    this.setState({
      answers: newAnswerArray,
      currentAnswer: ''
    })
  }

  deleteAnswer(e) {
    let i = parseInt(e.target.id);
    this.setState(prevState => {
      prevState.answers.splice(i, 1)
      return {answers: prevState.answers}
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    if (this.props.user === 'anonymous') return <Redirect to='/login' />
      return (
        <div>
          {/*NAVBAR*/}
          <div className="topnav">
            <Link to="/dashboard"><button>Dashboard</button></Link>
            <button onClick={() => this.props.logout()}>Log Out</button>
          </div>
          {/*HEADER*/}
          <h1>Create Your Poll!</h1>
          <div className="nav">
          <h2>Logged in as {this.props.user}</h2>
          </div>
          <div id="create-poll">
            <label className="label">Poll Title:</label>
            <div className="control">
              <input className="input" type="text" id="pollname" value={this.state.pollName} onChange={this.handleChange} placeholder="Name your poll"/>
            </div>
          </div>
          {/*NEW QUESTION*/}
          <div className="new-question box">
            <div>Question #{this.state.questions.length + 1}</div>
            <div className="field">
              <div className="control">
                <input className="input" type="text" id="currentQuestion" value={this.state.currentQuestion} onChange={this.handleChange} placeholder="Type your question here" />
              </div>
            </div>
            {/*CURRENT ANSWERS*/}
            {this.state.answers.length > 0 &&
              this.state.answers.map((answer, i) => {
                return (<li className="answer"><span>{answer}</span><button id={i.toString()} onClick={this.deleteAnswer}>delete</button></li>)
              })
            }
            <form onSubmit={this.addAnswer} className="field">
              <div className="control">
                <input className="input" type="text" id="currentAnswer"  value={this.state.currentAnswer} onChange={this.handleChange} placeholder="Type answer here to automatically add answer" />
              </div>
            </form>
            <div className="addQuestionWrapper">
              <button onClick={this.addQuestion}>Add Question</button>
            </div>
          </div>
          {/*SIDE ELEMENT CREATED QUESTIONS*/}
          <CreatedQuestions questions={this.state.questions}/>
        </div>
      )
  }
}

export default Create;