import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div id="landing-container">
          <div id="landing-nav">
          {/* <section className="hero">
          <div className="hero-body"> */}
            <div id="landing-banner">
              <h1>Welcome to Fire Poll</h1>
              <h2>Ignite engagement with your audience today</h2>
              <h3>Send real-time polls with a single link and view live responses!</h3>
            </div>
          {/* </div>
          </section> */}
            <div id="auth-nav" >
              <div><button onClick = {this.props.vote}>Vote</button></div>
              <div><Link to="/login"><button>Signup/Login</button></Link></div>
            </div>
          </div>
          <div id="landing-carousel">
            <h2>See our features!</h2>
            <img src="http://www.afd-techtalk.com/wp-content/uploads/2018/02/poll-time.jpg" />
            <p>Gingerbread dessert soufflé gummi bears wafer apple pie ice cream. Bear claw jujubes carrot cake candy chocolate bar marshmallow apple pie. Lemon drops gummies ice cream jujubes brownie tiramisu chocolate cake wafer.</p>
          </div>
        </div>
      )
  }
}

export default Landing;