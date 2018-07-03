import React from 'react';
import { Redirect } from 'react-router-dom';
import AnalyticsSub from './analyticsSub';
import axios from 'axios';
import Navbar from './navbar';


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
      });
    })
  }
  render() {
    return (
      <div>
        <Navbar logout={this.props.logout}/>
        <AnalyticsSub questions={this.state.questions}/>
      </div>
    )
  }
}

export default Analytics;