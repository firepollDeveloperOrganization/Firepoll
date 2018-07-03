import React from 'react';
import { Redirect } from 'react-router-dom';
import AnalyticsSub from './analyticsSub';
import axios from 'axios';


class Analytics extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      poll: {},
      questions: [],
      selected: 0
    }
  }
  
  componentDidMount() {
    axios.get(`/polls/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        poll: res.data,
        questions: res.data.questions
      });
    })
  }
  render() {
    return (
      <div className="analyticsParent">
        {this.state.questions.map((question, i)  => {
          return (<button onClick={() => this.setState({selected: i})}>{`Question ${i+1}`}</button>)
        })}
        <AnalyticsSub question={this.state.questions[this.state.selected]}/>
      </div>
    )
  }
}

export default Analytics;