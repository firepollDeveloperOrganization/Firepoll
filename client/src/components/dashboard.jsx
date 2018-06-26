import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import dummyData from '../../../pollManager/PollTestData.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [dummyData, dummyData]
    }
  }
  render() {
    let { user, email } = this.props;
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
      return (
        <div>
          <div>
            <h1>DASHBOARD: Welcome {user}!</h1>
            <h1>You are signing in with {email}</h1>
            <Link to="/create"><button>Create a poll!</button></Link>
            <button onClick={() => this.props.logout()}>Log Out</button>
          </div>
          <div>

          </div>
        </div>
      )
  }
}

export default Dashboard;