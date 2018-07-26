import Async from 'react-code-splitting';
import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Login from './login.jsx';
import {firebase} from '../firepollManagementClient.js';

const Dashboard = (props) => <Async load = {import('./dashboard.jsx')} componentProps = {props} />
const Live = (props) => <Async load = {import('./live.jsx')} componentProps = {props} />
const Create = (props) => <Async load = {import('./create.jsx')} componentProps = {props} />
const Analytics = (props) => <Async load = {import('./analytics.jsx')} componentProps = {props} />
const Landing = (props) => <Async load = {import('./landing.jsx')} componentProps = {props} />

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: null,
      userId: null
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase.auth().signOut()
      .then(() => this.props.history.push('/login'))
      .then(() => this.setState({user: null, email: null}))
      .catch(err => console.log('firebase auth error!'));
  }

  returnToDash = () => {
    this.props.history.push('/dashboard');
  }

  componentDidMount() {
    const initApp = () => {
      firebase.auth().onAuthStateChanged(user => {
        console.log('firebase auth: current user is', user);
        if (user) {
          console.log(user.displayName);
          console.log(user.email);
          this.setState({ user: user.displayName, email: user.email, userId: user.uid });
        } else {
          // document.getElementById('sign-in-status').textContent = 'Signed out';
          // document.getElementById('sign-in').textContent = 'Sign in';
          // document.getElementById('account-details').textContent = 'null';
        }
      }, err => console.log(err));
    };
    window.addEventListener('load', () => initApp());
  }
  
  render() {
    let user = this.state.user;
    let email = this.state.email || 'no email';
    let userId = this.state.userId;
    return (
      <div>
        <Route exact path="/" render={props => <Landing {...props} vote={this.vote} user={user} />} />
        <Route exact path="/create" render={(props) => <Create {...props} user={user} userId={userId} logout={this.logout} history = {this.props.history}/>} />
        <Route exact path="/edit/:pollId" render={(props) => <Create {...props} user={user} userId={userId} logout={this.logout} returnToDash={this.returnToDash}/>} />
        <Route exact path="/dashboard" render={props => <Dashboard {...props} user={user} userId={userId} logout={this.logout} history = {this.props.history} />} />
        <Route exact path="/analytics/:id" render={({match}) => <Analytics match={match} user={user} logout={this.logout} history = {this.props.history} />} />
        <Route exact path="/live/:id" render={props => <Live {...props} user={user} email={email} history = {this.props.history} logout={this.logout}/>} />
        <Route exact path="/login" render={props => <Login {...props} />} />
      </div>
    )
  }
}

export default withRouter(App);