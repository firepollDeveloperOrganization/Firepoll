import React from 'react';

const MultipleChoiceQuestion = (props) => {
  return (
    <div>
      <div className="title is-3">{props.question.question_title}</div>
        <form className="field control flex" key={props.question.id}>
          <select className="is-multiple is-danger is-medium" size = {props.question.answers.length} onChange = {(val) => {props.handleUserChoice(val)}}>
            {props.question.answers.map((answer, i) => {
              return (
                <option key={i} value = {JSON.stringify(answer)}>{answer.value}</option>
              );
            })}
          </select>
          <button className="button is-danger is-rounded is-medium" onClick = {(e) => {props.handleSubmit(e, props.question)}}>Select Answer</button>
      </form>
    </div>
  )
}

export default MultipleChoiceQuestion;