import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
      return (
        <div><h1>DASHBOARD: Welcome {this.props.user}!</h1></div>
      )
  }
}

export default Dashboard;