import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import CreatedQuestions from './createdQuestions.jsx';
import axios from 'axios';
import {firepoll} from '../firepollManagementClient';
import { EIO } from 'constants';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollname: '',
      questions: [],
      currentQuestion: '',
      currentAnswer: '',
      answers: [],
      invalid: false,
    };
 }
  componentDidMount() {
    let editPollId = this.props.match.params.pollId;
    if (editPollId) {
      axios.get(`/polls/${editPollId}`)
      .then(res => {
        let {title, questions} = res.data;
        this.setState({pollname: title, questions});  //this breaks the page format
      })
      .catch(err => console.log(err));
    }
  }

  updateAnswer = (e, ansIdx, qIdx) => {
    this.state.questions[qIdx].answers[ansIdx].choice = e.target.innerHTML;
    this.forceUpdate();
  }

  updateQuestion = (e, qIdx) => {
    // console.log(e.target.innerHTML, qIdx);
    // // console.log(this.state.questions[qIdx].question);
    this.state.questions[qIdx].question = e.target.innerHTML;
    this.forceUpdate();
  }
  resetPoll = () => {
    this.setState({
      pollname: '',
      questions: [],
      currentQuestion: '',
      currentAnswer: '',
      answers: []
    });
  }

  createPoll = () => {
    let editPollId = this.props.match.params.pollId;
    let poll = {
      author: this.props.userId,
      title: this.state.pollname,
      active: false,
      completed: false,
      num_questions: this.state.questions.length,
      total_answers: 0,
      winning_response: null,
      start_time: null,
      questions: this.state.questions
    }

    if (editPollId) {
      axios.put(`/polls/edit/${editPollId}`, poll)
        .then(res => this.props.returnToDash())
        .catch(err => console.error(err));
    } else if (this.state.pollname) {
      //  adding poll to MongoDB
      axios.post('/polls/', poll)
      .then(res => {
        console.log('saved: ', res);
        firepoll.stage(res.data._id, () => {
          this.setState({
            pollname: '',
            questions: [],
            currentQuestion: '',
            currentAnswer: '',
            answers: []
          })
          //then redirect to dashboard
        });
      })
      .catch(err => {
        console.error(err);
      })
    } else {
      this.setState({
        invalid: true
      }, setTimeout(() => {
        this.setState({
          invalid: false
        });
      }, 3000));
    }
  }

  addQuestion = () => {
    if (this.state.currentQuestion && this.state.answers.length !== 0) {
      var newQuestion = {
        question: this.state.currentQuestion,
        answers: this.state.answers,
        question_type: "multiple-choice",
        total_voting_time: 10000
      }
      var allQuestions = this.state.questions;
      allQuestions.push(newQuestion);
      this.setState({
        answers: [],
        currentQuestion: '',
        currentAnswer: '',
        questions: allQuestions
      });
    } else {
      this.setState({
        invalid: true
      }, setTimeout(() => {
        this.setState({
          invalid: false
        });
      }, 3000));
    }
  }
  
  addAnswer = (e) => {
    e.preventDefault();
    if (this.state.currentAnswer) {
      let newAnswerArray = this.state.answers;
      newAnswerArray.push({
        choice: this.state.currentAnswer,
        responders: [],
        votes: 0
      });
      this.setState({
        answers: newAnswerArray,
        currentAnswer: ''
      });
    } else {
      this.setState({
        invalid: true
      }, setTimeout(() => {
        this.setState({
          invalid: false
        });
      }, 3000));
    }
  }

  deleteAnswer = (e) => {
    let i = parseInt(e.target.id);
    this.setState(prevState => {
      prevState.answers.splice(i, 1)
      return {answers: prevState.answers}
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  deleteQuestion = (i) => {
    // console.log('deleting question', i);
    // console.log(this.state.questions[i]);
    let questions = this.state.questions;
    // console.log('preslice qs', questions);
    questions.splice(i, 1);
    // console.log('post slice qs', questions);
    this.setState({questions});

  }

  render() {
    let pathurl = this.props.location.pathname;
    if (this.props.user === 'anonymous') return <Redirect to='/login' />
      return (
        <div id="create-view">
          <div className="outer-banner">
            {/*HEADER*/}
            <div className="nav">
              <h1 className="title is-1">{pathurl === '/create' ? 'Create' : 'Edit'} Your Fire Poll!</h1>
              <h2 className="subtitle is-3">🔥 Logged in as {this.props.user}</h2>
            </div>
          {/*NAVBAR*/}
            <div id="topnav">
              <button className="button is-danger is-rounded is-large is-inverted is-outlined" onClick={() => this.props.logout()}>Log Out <span className="fa-fw fas fa-sign-out-alt"></span></button>
              <Link to="/dashboard"><button className="button is-danger is-rounded is-large is-inverted is-outlined">Dashboard <i className="fa-fw fas fa-address-card"></i></button></Link>
            </div>
          </div>
          <div id="create-poll">
            <label className="label subtitle is-5"><i className="fa-fw fas fa-boxes"></i> Poll Title:</label>
            <div className="control">
              <input className="input" type="text" id="pollname" value={this.state.pollname} onChange={this.handleChange} placeholder="Name your poll"/>
            </div>
          </div>
          {/*NEW QUESTION*/}
          <div className="new-question box">
            {this.state.invalid ? <div className = 'error-message'>Oops! You've left a field blank or entered an invalid value. Try again!</div>: ''}
            <div className="subtitle is-5"><i className="fa-fw far fa-question-circle"></i> Question #{this.state.questions.length + 1}</div>
            <div className="field">
              <div className="control">
                <input className="input" type="text" id="currentQuestion" value={this.state.currentQuestion} onChange={this.handleChange} placeholder="Type your question here" />
              </div>
            </div>
            {/*CURRENT ANSWERS*/}
            {this.state.answers.length > 0 &&
              this.state.answers.map((answer, i) => {
                return (<li className="answer" key={i}><button id={i.toString()} onClick={this.deleteAnswer} className="button is-danger is-rounded is-small is-inverted is-outlined">X</button><span>&nbsp;{answer.choice}</span></li>)
              })
            }
            <form onSubmit={this.addAnswer} className="field">
              <div className="control">
                <input className="input" type="text" id="currentAnswer"  value={this.state.currentAnswer} onChange={this.handleChange} placeholder="Type answer here and press enter to add" />
              </div>
            </form>
            <div className="addQuestionWrapper">
              <button className="button is-danger is-rounded is-small is-inverted is-outlined" onClick={this.addQuestion}>Add Question</button>
            </div>
          </div>
          {/*SIDE ELEMENT CREATED QUESTIONS*/}
          <CreatedQuestions questions={this.state.questions} deleteQuestion={this.deleteQuestion} updateAnswer={this.updateAnswer} updateQuestion={this.updateQuestion}/>
          <div id="createPollButtonWrapper">
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={this.createPoll}>{pathurl === '/create' ? 'Create' : 'Finish Editing'} Poll&nbsp;<i className="fa-fw far fa-calendar-plus"></i></button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={this.resetPoll}>Clear Poll&nbsp;<i className="fa-fw fas fa-ban"></i></button>
          </div>
        </div>
      )
  }
}

export default Create;