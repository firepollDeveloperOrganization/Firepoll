import React from 'react';
import { Link } from 'react-router-dom';

const Poll = (props) => {
  let {poll} = props;
  let deployButton = (<button className="button is-danger is-rounded is-small is-inverted is-outlined" onClick={() => props.deploy(poll.pollId)}>DEPLOY</button>);
  let liveButton = (<Link to={`/live/${poll.pollId}`}><button className="button is-danger is-rounded is-small is-inverted is-outlined">VIEW LIVE</button></Link>);
  let analyticsButton = (<Link to="/analytics"><button className="button is-danger is-rounded is-small is-inverted is-outlined">VIEW ANALYTICS</button></Link>);
  let status = !poll.staged ? 'DEPLOY' : poll.completed ? 'VIEW ANALYTICS' : 'VIEW LIVE';
  let statusButton = !poll.staged ? deployButton : poll.completed ? analyticsButton : liveButton;
  return (
    <div>
      <div>
        <h1>{poll.title}</h1>
        {/* <button>{status}</button> */}
        {statusButton}
      </div>
      <div className="questions-box">
        {poll.questions.map(question => <p key={question.questionId}>{question.question}</p>)}
      </div>
    </div>
  )
}

export default Poll;