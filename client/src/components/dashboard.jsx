import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Poll from './poll';
import dummypolls from './dummydata';
// import dummyData from '../../../pollManager/PollTestData.js';

const sortByDateDescending = arr => {
  return arr.sort((a, b) => {
    if (a.timeMS < b.timeMS) return 1;
    else return -1;
  })
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: sortByDateDescending(dummypolls)
    }
  }
  render() {
    let { user, email } = this.props;
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
      return (
        <div id="dashboard">
          <div className="nav">
            <h1>DASHBOARD: Welcome {user}!</h1>
            <h1>You are signing in with {email}</h1>
            <Link to="/create"><button>Create a poll!</button></Link>
            <button onClick={() => this.props.logout()}>Log Out</button>
          </div>
          <div id="polls-container">
            {this.state.polls.map(poll => <Poll key={poll.title} poll={poll} />)}
          </div>
        </div>
      )
  }
}

export default Dashboard;