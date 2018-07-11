import React from 'react';

const MultipleChoiceQuestion = (props) => {
  return (
    <div className = "question">
      <div className = "question-title">
        {props.question.question_title}
      </div>
      {props.question.answers.map((answer, i) => {
        if (answer.value) {
          var answerString = JSON.stringify(answer);
          return (
            <div className = {props.currChoice === answerString ? "answer answer-selected draw meet" : "answer draw meet"} key={i} onClick = {() => {
              props.handleUserChoice(answerString)
            }}>
              <div className = "answer-position">{answer.position}</div>
              <div>{answer.value}</div>
            </div>
          );
        }
      })}
    </div>
  )
}

export default MultipleChoiceQuestion;