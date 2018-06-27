import React from 'react';
import { Redirect } from 'react-router-dom';
// import firebase from '../config.js';
import { ui, uiConfig } from '../auth.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   redirect: false
    // };
    // this.authWithGoogle = this.authWithGoogle.bind(this);
    // this.authWithEmail = this.authWithEmail.bind(this);
    // auth.onAuthStateChanged(user => {
    //   console.log(user);
    // })
  }
  componentDidMount() {
    // if (ui.isPendingRedirect()) {
      ui.start('#firebaseui-auth-container', uiConfig);
      // }
  }
  // authWithGoogle() {
  //   alert('logging in with google');
  //   fire.auth().signInWithPopup(googleProvider)
  //     .then((res, err) => {
  //       if (err) alert('unable to sign in with google')
  //       else this.setState({redirect: true});
  //     })
  //     .catch(err => console.log('error signing in with google, err'));
  // }
  // authWithEmail(e) {
  //   e.preventDefault();
  //   alert('logging in with email');
  //   console.table([{email: this.emailInput.value, password: this.passwordInput.value} ]);
  // }
  render() {
    // if (this.props.isAuth) this.state.redirect = true;
    // if (this.props.user) return <Redirect to='/dashboard' />
      return (
        <div id="firebaseui-auth-container">
          {/* <button onClick={() => this.authWithGoogle()}>Log In With Google</button>
          <hr />
          <form onSubmit={e => this.authWithEmail(e)} ref={form => this.loginForm = form} >
            <div className="info-box">Login or signup here!</div>
            <label>Email: <input name="email" type="email" ref={input => this.emailInput = input} placeholder="Your Email" /></label>
            <label>Password: <input name="password" type="password" ref={input => this.passwordInput = input} placeholder="Your Password" /></label>
            <input type="submit" value="Sign Up / Log In"/>
          </form> */}
        </div>
      )
  }
}

export default Login;