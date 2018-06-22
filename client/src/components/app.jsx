import React from 'react';
import PollTestComponent from './pollTestComponent.jsx';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './landing.jsx';

class App extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} /> } />
          {/* <Route exact path="/login" render={props => <Login {...props} /> } /> */}
          {/* <Route exact path="/register" render={props => <Register {...props} /> } /> */}
          {/* <Route exact path="/polls/:id" render={props => <Register {...props} />} /> */}
          {/* <AuthRoute exact path="/auth" component={Auth} /> */}
          <PollTestComponent />
       </Switch>
      </BrowserRouter>
    )
  }
}

export default App;