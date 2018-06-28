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
      allPolls: sortByDateDescending(dummypolls),
      polls: sortByDateDescending(dummypolls)
    }
    this.deploy = this.deploy.bind(this);
    this.filterPolls = this.filterPolls.bind(this);
  }
  deploy(pollId) {
    console.log('deploying poll', pollId);
    // send put request? to update poll to `staged` = true,
    // should trigger a rerender of the polls
  }
  filterPolls(staged, completed) {
    console.log(`filtering for: staged ${staged}, completed ${completed}`);
    let filtered = this.state.allPolls.filter(poll => poll.completed === completed && poll.staged === staged);
    this.setState({polls: filtered}, () => console.log('filtered polls!'));
  }

  render() {
    let { user, email } = this.props;
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
      return (
        <div id="dashboard">
          <div className="nav">
            <div>
              <h1 className="title is-1">Welcome {user}!</h1>
              <h1 className="subtitle is-4">You are signing in with {email}</h1>
            </div>
            <div id="dashboard-nav">
              <Link to="/create"><button className="button is-danger is-rounded is-large is-inverted is-outlined">Create a poll!</button></Link>
              <button className="button is-danger is-rounded is-large is-inverted is-outlined" onClick={() => this.props.logout()}>Log Out</button>
            </div>
          </div>
          <div id="polls-filter">
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.setState({polls: this.state.allPolls})}>Show All Polls</button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(false, false)}>Show Only Undeployed</button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(true, false)}>Show Only Live</button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(true, true)}>Show Only Completed</button>
          </div>
          <div id="polls-container">
            {this.state.polls.map(poll => <Poll key={poll.title} poll={poll} deploy={this.deploy} />)}
          </div>
        </div>
      )
  }
}

export default Dashboard;