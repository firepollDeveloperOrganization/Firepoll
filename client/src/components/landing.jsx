import React from 'react';

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
            <button>Signup</button>
            <button>Login</button>
          </div>
        </div>
      )
  }
}

export default Landing;