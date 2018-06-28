import React from 'react';
import { Link } from 'react-router-dom';

const Poll = (props) => {
  let {poll} = props;
  let deployButton = (<button onClick={() => props.deploy(props.index)}>DEPLOY</button>);
  let liveButton = (<Link to={`/live/${poll.pollId}`}><button>VIEW LIVE</button></Link>);
  let analyticsButton = (<Link to="/analytics"><button>VIEW ANALYTICS</button></Link>);
  let status = !poll.staged ? 'DEPLOY' : poll.completed ? 'VIEW ANALYTICS' : 'VIEW LIVE';
  let statusButton = !poll.staged ? deployButton : poll.completed ? analyticsButton : liveButton;
  console.log('props inside poll: ', props);
  return (
    <div>
      <div>
        <h1>{poll.title}</h1>
        {/* <button>{status}</button> */}
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