import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Poll from './poll';
import dummypolls from './dummydata';
import axios from 'axios';
import firepoll from '../firepollManagementClient';
// import dummyData from '../../../pollManager/PollTestData.js';

const sortByDateDescending = arr => {
  return arr.sort((a, b) => {
    if (a.timeMS < b.timeMS) return 1;
    else return -1;
  })
}

const destructurePoll = (poll) => {
  var returnObj = {};
  returnObj.poll = {
    id: poll._id,
    data: {
    active: true,
    completed: false,
    author: poll.author,
    num_questions: poll.questions.length,
    start_time: new Date(),
    title: poll.title,
    winning_response: null
    }
  };

  let questions = poll.questions.map(question => {
    let answers = question.answers.map((answer, i) => {
      let answerObj = {
        id: answer._id,
        position: i + 1,
        value: answer.choice
      }
      return answerObj;
    })
    let obj = {
      answers: answers,
      display_results: true,
      num_responses: question.answers.length,
      question_title: question.question,
      total_voting_time: 10000,
      type: "multiple-choice"
    }
    let questionWrapper = {
      id: question._id,
      data: obj
    }
    return questionWrapper;
  })
  returnObj.questions = questions;
  return returnObj;
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPolls: [],
      filteredPolls: []
    }
    
  }

  getPolls = () => {
    axios.get(`/polls/user/${this.props.userId}`)
    .then(res => {
      console.log('users polls: ', res.data);
      this.setState({allPolls: res.data, filteredPolls: res.data})
    })
    .catch(err => {
      console.error(err);
    })
  }
  
  // When componentDidMount runs the first time, the props are not set yet, so that our db call would fail
  // The interval is a VERY hacky solution to the problem
  componentDidMount() {
    console.log(this.props);
    var that = this;
    var interval = setInterval(() => {
      console.log('running interval');
      if(that.props.userId !== null) {
        that.getPolls();
        clearInterval(interval);
      }
    }, 200);
  }

  // ONE WAY TO SOLVE IT, KINDA RISKY
  /*shouldComponentUpdate(nextProps, nextState) {
    if(nextProps === this.props && this.state.allPolls.length > 0) {
      if(nextState.filteredPolls !== nextState.allPolls) {
        return true;
      }
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.getPolls();
  }*/
  
  // THIS SHOULD RUN, BUT IT NEVER GETS RUN
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('will receive props', this.props);
    //this.getPolls(this.props.userId);
  }

  
  deploy = (index) => {
    // formats the poll
    var destructured = destructurePoll(this.state.filteredPolls[index]);
    console.log('destructured: ', destructured);
    // should send poll to firestore
    firepoll.run(destructured);
    // send db request to update poll to `active` = true,
    axios.put(`/polls/${destructured.poll.id}`, {active: true})
    .then(() => {
      console.log('updated ', destructured.poll.data.title);
    })
    .catch(err => {
      console.error('Updating poll in MongoDB to active:true :', err)
    });
    // should trigger a rerender of the polls
    this.setState((prevState, props) => {
      prevState.filteredPolls[index].active = true;
      return prevState;
    })
  }

  filterPolls = (active, completed) => {
    console.log(`filtering for: active ${active}, completed ${completed}`);
    let filtered = this.state.allPolls.filter(poll => poll.completed === completed && poll.active === active);
    this.setState({filteredPolls: filtered}, () => console.log('filtered polls!'));
  }



  render() {
    let { user, email } = this.props;
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
      return (
        <div id="dashboard">
          <div className="nav">
            <div>
              <h1 className="title is-1">🔥 Welcome {user}!</h1>
              {/* <h1 className="subtitle is-4">You are signing in with {email}</h1> */}
            </div>
            <div id="dashboard-nav">
              <button className="button is-danger is-rounded is-large is-inverted is-outlined" onClick={() => this.props.logout()}>Log Out  <i className="fa-fw fas fa-sign-out-alt"></i></button>
              <Link to="/create"><button className="button is-danger is-rounded is-large is-inverted is-outlined">Create a poll!  <i className="fa-fw far fa-calendar-plus"></i></button></Link>
            </div>
          </div>
          <div id="polls-filter">
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.setState({polls: this.state.allPolls})}>Show All Polls <i className="fa-fw fas fa-sync-alt"></i></button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(false, false)}>Show Only Undeployed <i className="fa-fw fas fa-rocket"></i></button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(true, false)}>Show Only Live <i className="fa-fw fas fa-fire"></i></button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(true, true)}>Show Only Completed <i className="fa-fw fas fa-calendar-check"></i></button>
          </div>
          <div id="polls-container">
            {this.state.filteredPolls.map((poll, i) => <Poll key={i} index={i} poll={poll} deploy={this.deploy} />)}
          </div>
        </div>
      )
  }
}

export default Dashboard;