import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import dummypolls from './dummydata';

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: this.props.location.pathname.slice(6),
    }
  }
  
  render() {
    let {user, email} = this.props;
    console.log('loading live poll', this.state.pollId, 'for', email);
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
      return (
        <div><h1>🔥🔥🔥 FIRE POLL #{this.state.pollId} 🔥🔥🔥</h1></div>
      )
  }
}

export default Live;