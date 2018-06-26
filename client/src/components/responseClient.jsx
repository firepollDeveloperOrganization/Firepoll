import React from 'react';
import firebase from '../config.js'

class ResponseClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      questions: [],
      responses: [],
      currChoice: null
    };
  };

  componentDidMount() {

    firebase.firestore().collection('polls').get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        });
      });
        return data;
      }).then((data) => {
        this.setState({
          polls: data
        });
      }).catch((err) => {
      console.log(err);
    });

    firebase.firestore().collection('polls').doc('YROTzLFtNPbhxlAGVbAx').onSnapshot((snapshot) => {
      let snapShotData = snapshot.data();
      let snapShotDataObj = {
        id: snapshot.id,
        data: snapShotData
      };
      this.setState({
        polls: [snapShotDataObj]
      });
    })

    firebase.firestore().collection('questions').doc('kBmo5FP8cmxnZXvW2kSX').get().then((snapshot) => {
      var snapShotData = snapshot.data();
      this.setState({
        questions: [snapShotData]
      });
    });

    firebase.firestore().collection('responses').doc('uw87eMrJUZebGtlnc9XB').get().then((snapshot) => {
      var snapShotData = snapshot.data();
      this.setState({
        responses: [snapShotData]
      });
    });

  }

  handleUserChoice(option) {
    this.setState({
      currChoice: option
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.currChoice !== null) {
      console.log(this.state.currChoice);
    }

    let userAnswer = {
      answer: this.state.currChoice,
      userID: 'TEST USER ID'
    }

    firebase.database().ref('/votes').push(userAnswer).then(() => {
      console.log('You have voted');
    }).catch((err) => {
      console.log(err);
    });

  }

  render() {
    return (
    <div> 
      <h1>TEST POLL</h1> 
      {
        this.state.polls.map((poll) => {
          return (
            <div key = {poll.id}>
              <h2>{poll.data.poll_title}</h2>
            </div>
          );
        })
      }
      {
        this.state.questions.map((question) => {
          return (<div>
            <div>{question.question_title}</div>
          </div>);
        })
      }
      {
        <form>
          <select>
            {this.state.responses.map((response) => {
              return (
                <option onSelect = {() => {this.handleUserChoice(response.value)}}>{response.value}</option>
              );
            })}
          </select>
          <button onClick = {this.handleSubmit}>Select Answer</button>
        </form>
      }
    </div>
    );
  }
}

export default ResponseClient;