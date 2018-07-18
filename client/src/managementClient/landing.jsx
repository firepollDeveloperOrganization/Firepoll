import React from 'react';
import Footer from './footer';

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
            <a href="/dashboard" className="btn btn--white btn--animated">GET STARTED</a>
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
                    Plug-in our technology into your existing app to engage with your users.
                  </h3>
                  <p className="paragraph">
                    Realtime user participation is growing in populairty through apps like HQ Trivia. Now you can do the same, without having to know how to write code for it.
                    Just use our API and connect it with your own front-end.                  </p>
                  <a href="https://github.com/Team-Ravenclaw/LivePoll" className="btn-text"> Learn more on GitHub &rarr;</a>
                </div>
              </div>

              <div className="col-1-of-3">
                <div className="photo-centered">
                  <img src={require('../../dist/images/hq-trivia.png')} alt="photo1" className="photo-centered__photo" />
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
                  Use our end-to-end application to create, control and analyze live polls
                </h3>
                <p className="paragraph">
                  Whether business meeting, conference or lecture. Firepoll is designed to give you all you need to conduct live polls.
                </p>
                {/*<a href="#" className="btn-text"> Learn more &rarr;</a>*/}
              </div>
            </div>
                
              <div className="col-1-of-3">
                <div className="photo-centered">
                  <img src={require('../../dist/images/conference.png')} alt="photo2" className="photo-centered__photo" />
                </div>
              </div>
            </div>
          </section>

          <section className="section-UX">
            <div className="row u-margin-top-medium">
              <div className="col-1-of-3">
                <div className="card">

                  <div className="card__side card__side--front">
                    <div className="card__picture card__picture-1">
                        &nbsp;
                      </div>
                      <h4 className="card__heading">
                        <span className="card__heading-span">
                          Ask a question
                        </span>
                      </h4>
                    </div>

                  <div className="card__side card__side--back">
                    <p className="card__back-text">Use multiple choice questions to identify gaps in understanding, or get anonymous feedback on a topic in a meeting.</p>
                  </div>
                </div>
              </div>

              <div className="col-1-of-3">
                <div className="card">

                  <div className="card__side card__side--front">
                    <div className="card__picture card__picture-2">
                      &nbsp;
                    </div>
                    <h4 className="card__heading">
                      <span className="card__heading-span">
                        Collect live responses
                      </span>
                    </h4>
                  </div>
                  
                  <div className="card__side card__side--back">
                    <p className="card__back-text">Invite the audience to respond simultaneously by sharing a unique link for your poll.</p>
                  </div>
                </div>
              </div>

              <div className="col-1-of-3">
                <div className="card">

                  <div className="card__side card__side--front">
                    <div className="card__picture card__picture-3">
                      &nbsp;
                    </div>
                    <h4 className="card__heading">
                      <span className="card__heading-span">
                        See instant results
                      </span>
                    </h4>
                  </div>
                  
                  <div className="card__side card__side--back">
                    <p className="card__back-text">Responses appear in an animated graph or chart embedded in your analytics view. Results update live for all to see.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="u-center-text u-margin-top-big">
              <a href="/dashboard" className="btn btn--white">GET STARTED</a>
            </div>

          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Landing;