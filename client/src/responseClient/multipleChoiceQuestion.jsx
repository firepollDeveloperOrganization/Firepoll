import React from 'react';

const MultipleChoiceQuestion = (props) => {
  return (
    <div className = "question">
      {props.question.answers.map((answer, i) => {
        if (answer.value) {
          var answerString = JSON.stringify(answer);
          return (
            <div className = {props.currChoice === answerString ? "answer answer-selected draw meet reveal" : "answer draw meet"} key={i} onClick = {() => {
              props.handleUserChoice(answerString)
            }}>{answer.value}</div>
          );
        }
      })}
    </div>
  )
}

export default MultipleChoiceQuestion;