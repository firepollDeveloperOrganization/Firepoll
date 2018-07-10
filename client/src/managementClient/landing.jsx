import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let landingLink = this.props.user ? "/dashboard" : "/login";
      return (
        <div>
          <header className="header">
            <div className="header__logo-box">
              <img src={require('../../dist/images/logo-white.png')} alt="Logo" className="header__logo" />
            </div>
            <div className="header__text-box">
              <h1 className="heading-primary">
                <span className="heading-primary--main">FIREPOLL</span>
                <span className="heading-primary--sub">IGNITE ENGAGEMENT WITH YOUR AUDIENCE</span>
              </h1>
              <a href="#" className="btn btn--white btn--animated">GET STARTED</a>
            </div>
          </header>
          <div className="u-margin-bottom-big"></div>

          <main>
            <section className="section-about">
              <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                  FIREPOLL: BOTH A TECHNOLOGY AND A PRODUCT
                </h2>
              </div>

              
              <div className="row row-animated__letter u-margin-bottom-medium">
                <div className="col-2-of-3">
                  <div className="col-1-of-4 u-center-text">
                    <p className="capital-letter">
                      A
                    </p>
                  </div>

                  <div className="col-3-of-4">
                    <h3 className="heading-tertiary u-margin-bottom-small">
                      Use our end-to-end application to create, control and analyze live polls
                    </h3>
                    <p className="paragraph">
                      Whether business meeting, conference or lecture. Firepoll is designed to give you all you need to conduct live polls.
                    </p>
                    <a href="#" className="btn-text"> Learn more &rarr;</a>
                  </div>
                </div>

                <div className="col-1-of-3">
                  <div className="photo-centered">
                    <img src={require('../../dist/images/conference.png')} alt="photo1" className="photo-centered__photo" />
                  </div>
                </div>
              </div>

              <div className="u-horizontal-divider u-margin-bottom-medium"></div>

              <div className="row row-animated__letter">
              <div className="col-2-of-3">
                <div className="col-1-of-4 u-center-text">
                  <p className="capital-letter">
                    B
                  </p>
                </div>

                <div className="col-3-of-4">
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Plug-in our technology into your existing app to engage with your users.
                  </h3>
                  <p className="paragraph">
                    Realtime user participation is growing in populairty through apps like HQ Trivia. Now you can do the same, without having to know how to write code for it.
                    Just use our API and connect it with your own front-end.
                  </p>
                  <a href="#" className="btn-text"> Learn more &rarr;</a>
                </div>
              </div>
                  
                <div className="col-1-of-3">
                  <div className="photo-centered">
                    <img src={require('../../dist/images/hq-trivia.png')} alt="photo2" className="photo-centered__photo" />
                  </div>
                </div>
              </div>
            </section>
          </main>

















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
              <div><Link to={landingLink}><span className="button is-primary is-large">Signup/Login</span></Link></div>
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