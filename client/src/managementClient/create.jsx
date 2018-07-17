import React from 'react';
import axios from 'axios';
import {firepoll} from '../firepollManagementClient';
import Navbar from './navbar';
import QuestionsList from "./questionsList";

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
          this.props.history.push('/dashboard');
        })
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

  deleteAnswer = (i) => {
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
      return (
        <div className="body-wrapper">
          <div className="container">
            <Navbar history = {this.props.history}/>
            <main className="create-view__content">
              <div className="create-and-sumbit-wrapper">
                <div className="create-poll">
                  <div className="create-poll__title">
                    Create a New Poll!
                  </div>
                  <div className="poll-form">
                    
                    <label className="poll-form__label" >Poll Title</label>
                    <input type="text" className="poll-form__input" id="pollname" value={this.state.pollname} onChange={this.handleChange} placeholder="Give your poll a name"/>
                  
                    <label className="poll-form__label"> Question {this.state.questions.length + 1}</label>
                    <input type="text" className="poll-form__input" id="currentQuestion" value={this.state.currentQuestion} onChange={this.handleChange} placeholder="Type your question here"/>

                    <label className="poll-form__label">Answers</label>
                      <div className="poll-form__answers">
                        {this.state.answers.length > 0 &&
                        this.state.answers.map((answer, i) => {
                          return (<p className="poll-form__answer" key={i}>{answer.choice} <span id={i.toString()} onClick={() => this.deleteAnswer(i)}><i className="far fa-trash-alt"></i></span></p>)
                        })}
                      </div>
                    <form onSubmit={this.addAnswer} className="poll-form__form">
                      <input className="poll-form__input" type="text" id="currentAnswer"  value={this.state.currentAnswer} onChange={this.handleChange} placeholder="Type answer here and press enter to add" />
                    </form>
                  </div>
                  <div className="poll-form__button-box u-margin-top-small">
                        <button className="btn--standard" onClick={this.addQuestion}>Add Question</button>
                  </div>
                  {this.state.invalid && <p className='error-message'>Oops! You've left a field blank or entered an invalid value. Try again!</p>}
                </div>
                <div className="poll-form__main-buttons-box">
                    <div className="poll-form__cancel" onClick={this.resetPoll}><span className="poll-form__main-button-text--1"> <span className="poll-form__cancel__icon">X</span>&nbsp; Cancel</span></div>
                    <div className="poll-form__submit" onClick={this.createPoll}><span className="poll-form__main-button-text--2">Submit Poll &rarr;</span></div>
                  </div>
              </div>

              <div className="questions">
                <QuestionsList questions={this.state.questions} deleteQuestion={this.deleteQuestion}/>
              </div>
            </main>
          </div>
        </div>
      )
  }
}

export default Create;