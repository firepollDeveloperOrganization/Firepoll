import React from 'react';
import { Redirect } from 'react-router-dom';
import dummypolls from './dummydata';

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: this.props.location.pathname.slice(6)
    }
  }
  
  render() {
    console.log('props of live page', this.props);
    console.log(this.state.pollId);
    let {user} = this.props;
    // if (!user) return <Redirect to='/login' />;
      return (
        <div><h1>🔥🔥🔥 FIRE POLL #{this.state.pollId} 🔥🔥🔥</h1></div>
      )
  }
}

export default Live;