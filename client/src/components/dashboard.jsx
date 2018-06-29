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
        position: i + 1,
        value: answer.choice
      }
      let answerWrapper = {
        id: answer._id,
        data: answerObj
      }
      return answerWrapper;
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
      console.log('updated ', destructured.poll.title);
    })
    .catch(err => {
      console.error('Updating poll in MongoDB to active:true :', err)
    });
    // should trigger a rerender of the polls
  }

  filterPolls = (staged, completed) => {
    console.log(`filtering for: staged ${staged}, completed ${completed}`);
    let filtered = this.state.allPolls.filter(poll => poll.completed === completed && poll.staged === staged);
    this.setState({filteredPolls: filtered}, () => console.log('filtered polls!'));
  }



  render() {
    let { user, email } = this.props;
    if (!user) return <Link to="/login"><button>Log In!</button></Link>;
    console.log('render function ', this.props);
      return (
        <div id="dashboard">
          <div className="nav">
            <div>
              <h1 className="title is-1">🔥 Welcome {user}!</h1>
              {/* <h1 className="subtitle is-4">You are signing in with {email}</h1> */}
            </div>
            <div id="dashboard-nav">
              <button className="button is-danger is-rounded is-large is-inverted is-outlined" onClick={() => this.props.logout()}>Log Out</button>
              <Link to="/create"><button className="button is-danger is-rounded is-large is-inverted is-outlined">Create a poll!</button></Link>
            </div>
          </div>
          <div id="polls-filter">
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.setState({polls: this.state.allPolls})}>Show All Polls</button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(false, false)}>Show Only Undeployed</button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(true, false)}>Show Only Live</button>
            <button className="button is-danger is-rounded is-medium is-inverted is-outlined" onClick={() => this.filterPolls(true, true)}>Show Only Completed</button>
          </div>
          <div id="polls-container">
            {this.state.filteredPolls.map((poll, i) => <Poll key={i} index={i} poll={poll} deploy={this.deploy} />)}
          </div>
        </div>
      )
  }
}

export default Dashboard;