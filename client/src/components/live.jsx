import React from 'react';

class Live extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    if (!this.props.user) return <Redirect to='/login' />
      return (
        <div><h1>LIVE POLLS CONTROL PAGE COMPONENT</h1></div>
      )
  }
}

export default Live;