import React from 'react';
import { Redirect } from 'react-router-dom';

class Live extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    let {user} = this.props;
    // console.log('props of live', this.props);
    if (!user) return <Redirect to='/login' />;
      return (
        <div><h1>LIVE POLLS CONTROL PAGE COMPONENT</h1></div>
      )
  }
}

export default Live;