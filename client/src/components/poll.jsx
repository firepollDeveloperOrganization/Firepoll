import React from 'react';
import { Link } from 'react-router-dom';

const Poll = (props) => {
  let {poll, deletePoll, editPoll} = props;
  let deployButton = (<button className="button is-danger is-rounded is-small is-inverted is-outlined" onClick={() => props.deploy(props.index)}>DEPLOY <i className="fa-fw fas fa-rocket"></i></button>);
  let liveButton = (<Link to={`/live/${poll._id}`}><button className="button is-danger is-rounded is-small is-inverted is-outlined">VIEW LIVE <i className="fa-fw fas fa-fire"></i></button></Link>);
  let analyticsButton = (<Link to={`/analytics/${poll._id}`}><button className="button is-danger is-rounded is-small is-inverted is-outlined">VIEW ANALYTICS <i className="fa-fw fas fa-calendar-check"></i></button></Link>);
  let closeButton = <button onClick={() => props.close(props.index)} className="button is-danger is-rounded is-small is-inverted is-outlined">CLOSE POLL</button>
  // let status = !poll.active ? 'DEPLOY' : poll.completed ? 'VIEW ANALYTICS' : 'VIEW LIVE';
  // let statusButton = !poll.active ? deployButton : poll.completed ? analyticsButton : liveButton;
  let status = poll.completed ? 'VIEW ANALYTICS' : poll.active ? 'VIEW LIVE' : 'DEPLOY';
  let statusButton = poll.completed ? analyticsButton : poll.active ? liveButton : deployButton;
  let undeployedDelete = (<button className="button is-danger is-rounded is-small is-inverted is-outlined" onClick={() => deletePoll(poll._id)}>DELETE&nbsp;<i className="fa-fw fas fa-trash"></i></button>);
  let UndeployedEdit = (<Link to={`/edit/${poll._id}`}>
  <button className="button is-danger is-rounded is-small is-inverted is-outlined" onClick={() => editPoll(poll._id)}>EDIT&nbsp;<i className="fa-fw fas fa-edit"></i></button>
  </Link>);
  let completedDelete = <button>ARCHIVE POLL</button>;
  let deleteButton = poll.completed ? completedDelete : poll.active ? '' : undeployedDelete;
  return (
    <div className="poll-item">
      <div className="dashboard-options">
        {statusButton}
        {poll.active && closeButton}
        {status === 'DEPLOY' && undeployedDelete}
        {status === 'DEPLOY' && UndeployedEdit}
      </div>
      &#8203;
      <hr />

      <h1 className="title is-3">{poll.title}</h1>
      <div className="questions-box">
        {poll.questions.map(question => <p key={question._id}>{question.question}</p>)}
      </div>
      <div><span className="response-url">Response url: {`https://firepoll.herokuapp.com/response/${poll._id}`}</span></div>
    </div>
  )
} 

export default Poll;