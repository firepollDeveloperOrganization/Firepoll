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
    let i = parseInt(e.target.name);
    this.setState({
      selectedQuestion: i
    })
  }

  render() {
    if (this.props.questions.length === 0) {
      return null;
    } else {
      return (
        <div id="createdQuestionsWrapper">
          <div id="createdQuestionsButtons">
            {this.props.questions.map((question, index) => {
              return (<button name={index} onClick={this.selectQuestion}>{`Question ${index}`}</button>)
            })}
          </div>
          <div id="selectedQuestion">
            <p id="selectedQuestionQuestion">
              {this.props.questions[this.state.selectedQuestion].question}
            </p>
            <ul id="selectedQuestionAnswers">
              {this.props.questions[this.state.selectedQuestion].answers.map((answer, index) => {
                return (<li className="selectedQuestionAnswer" key={index}>{answer.choice}</li>)
              })}
            </ul>
          </div>  
        </div>
      )
    }
  }
}

export default CreatedQuestions;