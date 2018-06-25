import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
      return (
        <div>
          <div id="landing-banner">
            <h1>Welcome to Live Poll!</h1>
            <p>Cupcake ipsum dolor sit amet. Pudding macaroon caramels. Macaroon gingerbread jujubes jelly-o topping candy. Marshmallow powder pie macaroon oat cake chupa chups tiramisu. Pudding oat cake chocolate bar croissant. Bear claw sesame snaps candy canes icing.</p>
          </div>
          <div id="auth-nav" >
            <Link to="/login"><button>Signup/Login</button></Link>
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