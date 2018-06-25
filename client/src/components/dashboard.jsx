import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    let { user, email } = this.props;
      return (
        <div>
          <h1>DASHBOARD: Welcome {user}!</h1>
          <h1>You are signing in with {email}</h1>
          </div>
      )
  }
}

export default Dashboard;