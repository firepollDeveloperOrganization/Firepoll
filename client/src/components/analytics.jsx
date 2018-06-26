import React from 'react';
import { Redirect } from 'react-router-dom';

class Analytics extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    if (!this.props.user) return <Redirect to='/login' />;
      return (
        <div><h1>POLL ANALYTICS PAGE COMPONENT</h1></div>
      )
  }
}

export default Analytics;