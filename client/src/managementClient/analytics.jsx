import React from 'react';
import { Redirect } from 'react-router-dom';
import AnalyticsSub from './analyticsSub';
import axios from 'axios';
import Navbar from './navbar';
import { createPie } from './visualizations';

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
    });
    
    createPie('pieChart', 'My Cool Poll', [
			{
				"label": "YES",
				"value": 32170,
				"color": "#f80000"
			},
			{
				"label": "Vote4",
				"value": 32170,
				"color": "#fd938d"
			},
			{
				"label": "Vote3",
				"value": 36344,
				"color": "#cb1b0e"
			},
			{
				"label": "Vote2",
				"value": 67706,
				"color": "#a94545"
			},
			{
				"label": "Vote1",
				"value": 78327,
				"color": "#7a0b03"
			}
		]);


  }
  render() {
    return (
      <div>
        <div id="pieChart"></div>
        <Navbar logout={this.props.logout}/>
        <AnalyticsSub questions={this.state.questions}/>
      </div>
    )
  }
}



export default Analytics;