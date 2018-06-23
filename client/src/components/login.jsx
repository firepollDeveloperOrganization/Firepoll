import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.authWithEmail = this.authWithEmail.bind(this);
  }
  authWithGoogle() {
    alert('logging in with google');
    app.auth().signInWithPopup(googleProvider)
      .then((res, err) => {
        if (err) alert('unable to sign in with google')
        else this.setState({redirect: true});
      })
      .catch(err => console.log('error signing in with google, err'));
  }
  authWithEmail(e) {
    e.preventDefault();
    alert('logging in with email');
    console.table([{email: this.emailInput.value, password: this.passwordInput.value} ]);
  }
  render() {
    if (this.props.isAuth) this.state.redirect = true;
    if (this.state.redirect) return <Redirect to='/dashboard' />
      return (
        <div>
          <button onClick={() => this.authWithGoogle()}>Log In With Google</button>
          <hr />
          <form onSubmit={e => this.authWithEmail(e)} ref={form => this.loginForm = form} >
            <div className="info-box">Login or signup here!</div>
            <label>Email: <input name="email" type="email" ref={input => this.emailInput = input} placeholder="Your Email" /></label>
            <label>Password: <input name="password" type="password" ref={input => this.passwordInput = input} placeholder="Your Password" /></label>
            <input type="submit" value="Sign Up / Log In"/>
          </form>
        </div>
      )
  }
}

export default Login;