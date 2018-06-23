import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './landing.jsx';
import Create from './create.jsx';
import Dashboard from './dashboard.jsx';
import Analytics from './analytics.jsx';
import Live from './live.jsx';
import Login from './login.jsx';

var config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: 'Rose'
    };
  }
  render() {
    let isAuth = this.state.authenticated;
    let user = this.state.user;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} /> } />
          <Route exact path="/create" render={(props) => <Create {...props} isAuth={isAuth} user={user}/> } />
          <Route exact path="/dashboard" render={props => <Dashboard {...props} /> } />
          <Route exact path="/analytics" render={props => <Analytics {...props} /> } />
          <Route exact path="/live" render={props => <Live {...props} /> } />
          <Route exact path="/login" render={props => <Login {...props} isAuth={isAuth} user={user} /> } />
          {/* <Route exact path="/polls/:id" render={props => <Register {...props} />} /> */}
          {/* <AuthRoute exact path="/auth" component={Auth} /> */}
          {/* <PollAudienceClientTest />  enter any nonexistent route to render your test components */}
          {/* <PollManagerClientTest /> */}
       </Switch>
      </BrowserRouter>
    )
  }
}

export default App;