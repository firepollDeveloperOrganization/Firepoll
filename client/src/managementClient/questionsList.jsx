import React from 'react';

const QuestionsList = ({questions, deleteQuestion}) => {
  if (questions.length === 0) return null;
  return (
    <div className="questions-list__component-wrapper">
      <div className="create-poll__title">
        Questions
      </div>
      <ol className="questions-list__list">
        {questions.map((question, i) => {
          let hr = i === questions.length - 1 ? null : <hr className="hr--dotted"/>;
          return (
            <li className="questions-list__question">
              <div className="questions-list__question-title">{question.question}<span style={{marginLeft: ".5rem"}} onClick={() => deleteQuestion(i)}><i className="far fa-trash-alt"></i></span></div>
              <ul className="questions-list__answers">
                {question.answers.map((answer, i) => {
                  return (
                    <li className="questions-list__answer">{answer.choice}</li>
                  )
                })}
              </ul>
              {hr}
            </li>
          )
        })}
      </ol>

    </div>
  )
};

export default QuestionsList; 