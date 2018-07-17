import React from 'react';


const Footer = (props) => (
  <footer className="footer">
    <div className="footer__logo-box">
      <img src={require('../../dist/images/logo-white.png')} alt="Full logo" className="footer__logo" />
    </div>    
    <div className="footer__name-box">
      <p className="footer__name">FIREPOLL</p>
    </div>
    <div className="row">
      <div className="col-1-of-2">
        <div className="footer__navigation">
          <ul className="footer__list">
            <li className="footer__item"><a href="https://github.com/Team-Ravenclaw/LivePoll" className="footer__link">Collaborate</a></li>
          </ul>
        </div>
      </div>
      <div className="col-1-of-2">
        <p className="footer__copyright">
          Built by <a href="https://github.com/R-SE" className="footer__link">Rose Lin</a>, <a href="https://github.com/rogersanick" className="footer__link">Nick Rogers</a> and <a href="https://github.com/laurentsmohr" className="footer__link">Laurents Mohr</a>.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer;