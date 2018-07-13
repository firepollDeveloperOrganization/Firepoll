import React from 'react';

const QuestionsList = ({questions}) => {
  if (questions.length === 0) return null;
  return (
    <div className="questions-list__component-wrapper">
      <div className="create-poll__title">
        Questions
      </div>
      <ol className="questions-list__list">
        {questions.map((question, i) => {

          return (
            <li className="questions-list__question">
              <div className="questions-list__question-title">{question.question}</div>
              <ul className="questions-list__answers">
                {question.answers.map((answer, i) => {
                  return (
                    <li className="questions-list__answer">{answer.choice}</li>
                  )
                })}
              </ul>
              <hr className="hr--dotted"/>
            </li>
          )
        })}
      </ol>

    </div>
  )
};

export default QuestionsList; 