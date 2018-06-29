import React from 'react';
import { Link } from 'react-router-dom';

const Poll = (props) => {
  let {poll} = props;
  let deployButton = (<button className="button is-danger is-rounded is-small is-inverted is-outlined" onClick={() => props.deploy(props.index)}>DEPLOY <i className="fa-fw fas fa-rocket"></i></button>);
  let liveButton = (<Link to={`/live/${poll.pollId}`}><button className="button is-danger is-rounded is-small is-inverted is-outlined">VIEW LIVE <i className="fa-fw fas fa-fire"></i></button></Link>);
  let analyticsButton = (<Link to="/analytics"><button className="button is-danger is-rounded is-small is-inverted is-outlined">VIEW ANALYTICS <i className="fa-fw fas fa-calendar-check"></i></button></Link>);
  // let status = !poll.active ? 'DEPLOY' : poll.completed ? 'VIEW ANALYTICS' : 'VIEW LIVE';
  // let statusButton = !poll.active ? deployButton : poll.completed ? analyticsButton : liveButton;
  let status = poll.completed ? 'VIEW ANALYTICS' : poll.active ? 'VIEW LIVE' : 'DEPLOY';
  let statusButton = poll.completed ? analyticsButton : poll.active ? liveButton : deployButton;
  return (
    <div className="poll-item">
      <div>
        <h1 className="title is-3">{poll.title}</h1>
        {statusButton}
      </div>
      <div className="questions-box">
        {poll.questions.map(question => <p key={question._id}>{question.question}</p>)}
      </div>
      <p>Response url: {`firepoll.com/response/${poll._id}`}</p>
    </div>
  )
}

export default Poll;