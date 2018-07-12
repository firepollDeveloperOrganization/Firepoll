import React from 'react';
import { Redirect } from 'react-router-dom';
import AnalyticsSub from './analyticsSub';
import axios from 'axios';
import Navbar from './navbar';
import { createPie } from './visualizations';

const createData = answers => {
  console.log(answers);
  // let data = [];
  let colors = ["#f80000", "#fd938d", "#cb1b0e", "#a94545", "#7a0b03"];
  let data = answers.map((ans, i) => {return {label: ans.choice, value: ans.votes, color: colors[i]}});
  console.log('data is', data);
  return data;
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
        // createPie('pieChart', this.state.poll.title, [
        //   {
        //     "label": "YES",
        //     "value": 32170,
        //     "color": "#f80000"
        //   },
        //   {
        //     "label": "Vote4",
        //     "value": 32170,
        //     "color": "#fd938d"
        //   },
        //   {
        //     "label": "Vote3",
        //     "value": 36344,
        //     "color": "#cb1b0e"
        //   },
        //   {
        //     "label": "Vote2",
        //     "value": 67706,
        //     "color": "#a94545"
        //   },
        //   {
        //     "label": "Vote1",
        //     "value": 78327,
        //     "color": "#7a0b03"
        //   }
        // ]);
      });
    });
  }
  render() {
    let divs = this.state.questions.length ? this.state.questions.map(q => <div key={q._id} id={q._id}>{q._id}</div>) : <div>Loading divs</div>;
    // let questions = this.state.questions.length ? this.state.questions.map(q => createPie(q._id, q.question, createData(q.answers))) : <div>Loading qs</div>;
    return (
      <div>
        <Navbar logout={this.props.logout}/>
        {/* <div id="pieChart"></div> */}
        {/* {this.state.questions.map(q => <div key={q._id} id={q._id}>{q._id}</div>)} */}
        {/* {this.state.questions.map(q => createPie(q._id, q.question, createData(q.answers)))} */}
        {/* <AnalyticsSub questions={this.state.questions}/> */}
        {divs}
        {/* {questions} */}
      </div>
    )
  }
}



export default Analytics;