import React from 'react';

class CreatedQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuestion: 0
    };
    this.selectQuestion = this.selectQuestion.bind(this);
  }
  
  selectQuestion(e) {
    let i = parseInt(e.target.value);
    this.setState({
      selectedQuestion: i
    })

  }
  handleDelete = () => {
    let idx = this.state.selectedQuestion;
    this.state.selectedQuestion = 0;
    this.props.deleteQuestion(idx);
  }
  // handleEdit = (e, ansIdx, qIdx) => {
  //   console.log(e.target.innerHTML, ansIdx, qIdx);
  //   // console.log(ans);
  // }

  render() {
    if (this.props.questions.length === 0) {
      return null;
    } else {
      return (
        <div id="createdQuestionsWrapper">
          <div id="createdQuestionsButtons">
            {/* {this.props.questions.map((question, index) => {
              return (<button name={index} key={index} onClick={this.selectQuestion} className="button is-danger is-rounded is-small is-inverted is-outlined">{`Question ${index + 1}`}</button>)
            })} */}
            <div className="select is-rounded is-danger is-small">
              <select onChange={e => this.selectQuestion(e)}>
                {this.props.questions.map((question, i) => <option name={i} key={i} value={i}>{`Question ${i + 1}`}</option>)}
              </select>
            </div>

          </div>
          <div id="selectedQuestion">
            <h1 id="selectedQuestionQuestion">
              {this.props.questions[this.state.selectedQuestion].question}
            </h1>
            <ul id="selectedQuestionAnswers">
              {this.props.questions[this.state.selectedQuestion].answers.map((answer, index) => {
                return (<li className="selectedQuestionAnswer" key={index} contentEditable="true" onBlur={(e) => this.props.updateAnswer(e, index, this.state.selectedQuestion)}>{answer.choice}</li>)
              })}
            </ul>
              <button className="button is-danger is-rounded is-inverted is-outlined is-small" onClick={this.handleDelete}>Delete selected question</button>
          </div>  
        </div>
      )
    }
  }
}

export default CreatedQuestions;