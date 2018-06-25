import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    let { user, email } = this.props;
    if (!user) return <Redirect to='/login' />
      return (
        <div>
          <h1>DASHBOARD: Welcome {user}!</h1>
          <h1>You are signing in with {email}</h1>
          <button onClick={() => this.props.logout()}>Log Out</button>
        </div>
      )
  }
}

export default Dashboard;