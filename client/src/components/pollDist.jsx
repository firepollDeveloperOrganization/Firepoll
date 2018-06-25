import React from 'react';
import firebase from '../config.js'

class PollDist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
  };

  componentDidMount() {

    firebase.database().ref('/polls').once('value').then( (snapshot) => {

      var polls = [];

      for (let key in snapshot.val()) {
        var newPoll = snapshot.val()[key];
        newPoll.push_id = key;
        polls.push(newPoll);
      }

      this.setState({
        polls: polls
      });
    } ).catch((err) => {
      console.log(err);
    });

    firebase.database().ref('/polls').on('value', (snapshot) => {

      console.log('heyyhrgsfd');

      var polls = [];

      for (let key in snapshot.val()) {
        var newPoll = snapshot.val()[key];
        newPoll.push_id = key;
        polls.push(newPoll);
      }

      this.setState({
        polls: polls
      });
    });
  }

  render() {
    return (
    <div> 
      <h1>TEST POLL</h1> 
      {
        this.state.polls.map((poll) => {
          return (<div>
            <div>{poll.question_title}</div>
            <form>
              <select multiple>
                {poll.options.map(option => {
                  return(<option>{option}</option>)
                })}
              </select>
            </form>
          </div>);
        })
      }
    </div>
    );
  }
}

export default PollDist