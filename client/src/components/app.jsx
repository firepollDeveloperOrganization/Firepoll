import React from 'react';
import PollTestComponent from './pollTestComponent.jsx';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './landing.jsx';
import Create from './create.jsx';
import Dashboard from './dashboard.jsx';
import Analytics from './analytics.jsx';
import Live from './live.jsx';

class App extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} /> } />
          <Route exact path="/create" render={props => <Create {...props} /> } />
          <Route exact path="/dashboard" render={props => <Dashboard {...props} /> } />
          <Route exact path="/analytics" render={props => <Analytics {...props} /> } />
          <Route exact path="/live" render={props => <Live {...props} /> } />
          {/* <Route exact path="/login" render={props => <Login {...props} /> } /> */}
          {/* <Route exact path="/polls/:id" render={props => <Register {...props} />} /> */}
          {/* <AuthRoute exact path="/auth" component={Auth} /> */}
          <PollTestComponent />
       </Switch>
      </BrowserRouter>
    )
  }
}

export default App;