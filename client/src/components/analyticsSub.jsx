import React from 'react';

const AnalyticsSub = ({questions}) => {
  if(!questions){
    return null;
  }
  return (
    <div className="section">
      <div className="columns">
      {questions.map(question => {
        let answers = question.answers.map(answer => (
          <li><span>{answer.choice} </span> <span> {answer.vote}</span></li>
        ))
        return (
        <div className="column">
          <div className="box">
            <div className="content">
              <div style={{fontWeight: "700"}}>{question.question}</div>
                <ul>
                  {answers}
                </ul>
              </div>
          </div>
        </div>
        )
      })}   
    </div>
  </div>
  )
}

export default AnalyticsSub;