import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';

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
              <h1 className="title is-1 heading">🔥 Welcome to Fire Poll 🔥</h1>
              <h2 className="subtitle is-3">Ignite engagement with your audience today</h2>
              <h3 className="subtitle is-5">Send real-time polls with a single link and view live responses!</h3>
            </div>
          {/* </div>
          </section> */}
            <div id="auth-nav" >
              <div><a className="button is-primary is-large" onClick={this.props.vote}>Vote</a></div>
              <div><Link to="/login"><span className="button is-primary is-large">Signup/Login</span></Link></div>
            </div>
          </div>
          <div id="carousel-container">
            <Carousel id="carousel">
              <img src="https://www.rcn.org.uk/-/media/royal-college-of-nursing/images/news-800x400/2017/april/pay-poll.jpg" />
              <img src="http://www.afd-techtalk.com/wp-content/uploads/2018/02/poll-time.jpg" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMtCJLC4-iiVMEhQQINQySJJaDQouEWSceHBNQcqovSV2ok-zm" />
            </Carousel>
          </div>
        </div>
      )
  }
}

export default Landing;