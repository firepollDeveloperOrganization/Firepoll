import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let landingLink = this.props.user ? "/dashboard" : "/login";
      return (
        <div id="landing-container">
          {/* <section className="hero">
          <div className="hero-body"> */}
          <h1 className="title is-1 heading">🔥 Welcome to Fire Poll 🔥</h1>
          <h2 className="subtitle is-3">Ignite engagement with your audience today</h2>
          <h3 className="subtitle is-5">Send real-time polls with a single link and view live responses!</h3>
          {/* </div>
          </section> */}
            <div id="auth-nav" >
              <div><Link to={landingLink}><span className="button is-primary is-large">Signup/Login</span></Link></div>
            </div>
        </div>
      )
  }
}

export default Landing;