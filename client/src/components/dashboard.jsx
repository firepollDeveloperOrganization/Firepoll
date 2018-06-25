import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { user, email } = this.props;
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
      return (
        <div>
          <h1>DASHBOARD: Welcome {user}!</h1>
          <h1>You are signing in with {email}</h1>
          <Link to="/create"><button>Create a poll!</button></Link>
          <button onClick={() => this.props.logout()}>Log Out</button>
        </div>
      )
  }
}

export default Dashboard;