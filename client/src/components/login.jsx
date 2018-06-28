import React from 'react';
import { Redirect } from 'react-router-dom';
import { ui, uiConfig } from '../auth.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
      ui.start('#firebaseui-auth-container', uiConfig);
  }
  render() {
      return (
        <div id="firebaseui-auth-container"></div>
      )
  }
}

export default Login;