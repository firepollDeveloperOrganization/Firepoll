import React from 'react';

const AnalyticsSub = ({question}) => {
  if(!question){
    return null;
  }
  return (
    <div className="analytics">
      <div className="analytics-question-title">
        {question.title}
      </div>
      {question.answers.map(answer => {
        return (
          <div className="analytics-answer">
            <p className="analytics-answer-title">{answer.choice} <span> {answer.votes}</span></p>
          </div>
        )
      })}
    </div>
  )
}

export default AnalyticsSub;