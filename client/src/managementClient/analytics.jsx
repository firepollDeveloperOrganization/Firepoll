import React from 'react';
import { Redirect } from 'react-router-dom';
// import AnalyticsSub from './analyticsSub';
import axios from 'axios';
import Navbar from './navbar';
import { createPie } from './visualizations';

const createData = answers => {
  console.log(answers);
  let colors = ["#f80000", "#fd938d", "#cb1b0e", "#a94545", "#7a0b03"];
  return answers.map((ans, i) => {return {label: ans.choice, value: ans.votes, color: colors[i]}});
}

class Analytics extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      poll: {},
      questions: []
    }
  }
  
  componentDidMount() {
    axios.get(`/polls/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        poll: res.data,
        questions: res.data.questions
      }, () => {
        console.log(this.state);
        this.state.questions.map(q => createPie(q._id, q.question, createData(q.answers)))
      });
    });
  }
  render() {
    let divs = this.state.questions.length ? this.state.questions.map(q => <div key={q._id} id={q._id}></div>) : <div>Loading divs</div>;
    let title = this.state.poll ? <h1>{this.state.poll.title}</h1> : '';
    return (
      <div id="analytics">
        <Navbar logout={this.props.logout}/>
        {/* {this.state.questions.map(q => <div key={q._id} id={q._id}>{q._id}</div>)} */}
        {/* {this.state.questions.map(q => createPie(q._id, q.question, createData(q.answers)))} */}
        {/* <AnalyticsSub questions={this.state.questions}/> */}
        {title}
        <div id="donuts-container">{divs}</div>
      </div>
    )
  }
}



export default Analytics;