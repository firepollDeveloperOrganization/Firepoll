import React from 'react';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import axios from 'axios';

const Poll = (props) => {
  let {poll, deletePoll, editPoll, openModal, setCurrentLink} = props;
  let deployButton = (<button className="btn--standard btn--small" onClick={() => props.deploy(props.index)}>DEPLOY <i className="fa-fw fas fa-rocket"></i></button>);
  let liveButton = (<Link to={`/live/${poll._id}`} target="_blank"><button className="btn--standard btn--small">VIEW LIVE <i className="fa-fw fas fa-fire"></i></button></Link>);
  let analyticsButton = (<Link to={`/analytics/${poll._id}`}><button className="btn--standard btn--small">VIEW ANALYTICS <i className="fa-fw fas fa-calendar-check"></i></button></Link>);
  let closeButton = <button onClick={() => props.close(props.index)} className="btn--standard btn--small">CLOSE POLL</button>
  // let status = !poll.active ? 'DEPLOY' : poll.completed ? 'VIEW ANALYTICS' : 'VIEW LIVE';
  // let statusButton = !poll.active ? deployButton : poll.completed ? analyticsButton : liveButton;
  let status = poll.completed ? 'VIEW ANALYTICS' : poll.active ? 'VIEW LIVE' : 'DEPLOY';
  let statusButton = poll.completed ? analyticsButton : poll.active ? liveButton : deployButton;
  let deletePollButton = (<button className="btn--standard btn--small" onClick={() => deletePoll(poll._id)}>DELETE&nbsp;<i className="fa-fw fas fa-trash"></i></button>);
  let UndeployedEdit = (<Link to={`/edit/${poll._id}`}>
  <button className="btn--standard btn--small">EDIT &nbsp;<i className="fa-fw fas fa-edit"></i></button>
  </Link>);
  // let completedDelete = <button onClick={() => deletePoll(poll._id)}>DELETE POLL</button>;
  // let deleteButton = poll.completed ? completedDelete : poll.active ? '' : undeployedDelete;
  let linkUrl = `firepoll.solutions/response/${poll._id}`;
  return (
    <div className="poll-item">
      <div className="poll-item-title">
        <h1 className="poll-item-title-text">{poll.title}</h1>
      </div>
      <div className="questions-box">
        {poll.questions.map((question, i) => <p key={question._id} className="questions-box__question"><span className="questions-box__question-number">{i+1}. &nbsp;</span>{question.question}</p>)}
      </div>
      <div className="dashboard-options">
        <div className="response-url">
          <button className="btn--standard-small-grey" onClick={() => copy(linkUrl)}>Copy Link &nbsp;<i className="far fa-clipboard"></i>&nbsp;</button>
          <button className="btn--standard-small-grey">
            <a className="email-link" href={`mailto:?subject=Vote in this Fire Poll!&body=Here is a link to your fire poll!%0D%0A
            ${linkUrl}%0D%0A
            Thanks for voting!`} >Email Link &nbsp;<i className="far fa-envelope"></i>&nbsp;</a>
          </button>
          <button onClick={() => {openModal(); setCurrentLink(linkUrl);}} className="btn--standard-small-grey">Text Link &nbsp; <i className="fas fa-mobile-alt"></i>&nbsp;</button>
        </div>
        <div className="dashboard-options-group">
          {statusButton}
          {poll.active && closeButton}
          {status === 'DEPLOY' && deletePollButton}
          {status === 'DEPLOY' && UndeployedEdit}
          {status === 'VIEW ANALYTICS' && deletePollButton}
        </div>
      </div>
    </div>
  )
} 

export default Poll;