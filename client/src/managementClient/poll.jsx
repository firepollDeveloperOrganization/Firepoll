import React from 'react';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import axios from 'axios';

const Poll = (props) => {
  let {poll, deletePoll, editPoll, openModal, setCurrentLink} = props;
  let deployButton = (<button className="created-poll-button" onClick={() => props.deploy(props.index)}>DEPLOY <i className="fa-fw fas fa-rocket"></i></button>);
  let liveButton = (<Link to={`/live/${poll._id}`}><button className="created-poll-button">VIEW LIVE <i className="fa-fw fas fa-fire"></i></button></Link>);
  let analyticsButton = (<Link to={`/analytics/${poll._id}`}><button className="created-poll-button">VIEW ANALYTICS <i className="fa-fw fas fa-calendar-check"></i></button></Link>);
  let closeButton = <button onClick={() => props.close(props.index)} className="created-poll-button">CLOSE POLL</button>
  // let status = !poll.active ? 'DEPLOY' : poll.completed ? 'VIEW ANALYTICS' : 'VIEW LIVE';
  // let statusButton = !poll.active ? deployButton : poll.completed ? analyticsButton : liveButton;
  let status = poll.completed ? 'VIEW ANALYTICS' : poll.active ? 'VIEW LIVE' : 'DEPLOY';
  let statusButton = poll.completed ? analyticsButton : poll.active ? liveButton : deployButton;
  let deletePollButton = (<button className="button is-danger is-rounded is-small is-inverted is-outlined" onClick={() => deletePoll(poll._id)}>DELETE&nbsp;<i className="fa-fw fas fa-trash"></i></button>);
  let UndeployedEdit = (<Link to={`/edit/${poll._id}`}>
  <button className="button is-danger is-rounded is-small is-inverted is-outlined">EDIT &nbsp;<i className="fa-fw fas fa-edit"></i></button>
  </Link>);
  // let completedDelete = <button onClick={() => deletePoll(poll._id)}>DELETE POLL</button>;
  // let deleteButton = poll.completed ? completedDelete : poll.active ? '' : undeployedDelete;
  let linkUrl = `https://firepoll.herokuapp.com/response/${poll._id}`;
  return (
    <div className="poll-item">
      <div className="poll-item-title">
        <h1 className="poll-item-title-text">{poll.title}</h1>
      </div>
      <div className="questions-box">
        {poll.questions.map(question => <p key={question._id}>{question.question}</p>)}
      </div>
      <div className="dashboard-options">
        <div className="response-url">
          <button className="created-poll-button" onClick={() => copy(linkUrl)}>Copy Link &nbsp;<i className="far fa-clipboard"></i>&nbsp;</button>
          <button className="created-poll-button">
            <a href={`mailto:?subject=Vote in this Fire Poll!&body=Here is a link to your fire poll!%0D%0A
            ${linkUrl}%0D%0A
            Thanks for voting!`} >Email Link &nbsp;<i className="far fa-envelope"></i>&nbsp;</a>
          </button>
          <button onClick={() => {openModal(); setCurrentLink(linkUrl);}} className="created-poll-button">Text Link &nbsp; <i className="fas fa-mobile-alt"></i>&nbsp;</button>
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