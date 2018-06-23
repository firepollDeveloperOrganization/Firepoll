import React from 'react';
import PollAudienceClientTest from './pollAudienceClientTest';
import PollManagerClientTest from './pollManagerClientTest';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <div>Hello world!</div>
            <PollAudienceClientTest />
            <PollManagerClientTest />
          </div>
          {/* <Route exact path="/login"> render={props => <Login {...props} /> } /> */}
          {/* <Route exact path="/register"> render={props => <Register {...props} /> } /> */}
          {/* <Route exact path="/polls/:id"> render={props => <Register {...props} />} /> */}
          {/* <AuthRoute exact path="/auth" component={Auth} /> */}
       </Switch>
      </BrowserRouter>
    )
  }
}

export default App;