import React from 'react';

const Poll = (props) => {
  let {poll} = props;
  let status = !poll.staged ? 'DEPLOY' : poll.complete ? 'VIEW ANALYTICS' : 'VIEW LIVE';
  return (
    <div>
      <div>
        <h1>{poll.title}</h1>
        <button>{status}</button>
      </div>
      <div className="questions-box">
        {poll.questions.map(question => <p key={question.questionId}>{question.question}</p>)}
      </div>
    </div>
  )
}

export default Poll;