
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import testData from './testData';

// import the component you want to test
import Live from '../client/src/managementClient/live.jsx';

configure({ adapter: new Adapter() })

describe('Live View Component', function() {

  var wrapper;
  var poll;
  var questions;
  
  before(function() {
    let match = {params: {}};
    match.params.id = '1a2b3c4d5e6f';
    wrapper = shallow(<Live match={match} user={'Dorothea Schoepfer'} email={'dorothea.schoepfer@gmail.com'}/>);
    poll = testData;
    poll.active = true;
    questions = testData.questions;
    questions.forEach((question, i) => {
      if (i === 0) {
        question.active = true;
      } else {
        question.active = false;
      }
    })
  });  


  it('should start with an empty poll, no questions and closed set to false.', function() {
    expect(wrapper.state('poll')).to.eql({});
    expect(wrapper.state('questions')).to.eql([]);
    expect(wrapper.state('closed')).to.equal(false);      
  });

  it('should render all questions', () => {
    wrapper.setState({
      poll,
      questions
    })
    expect(wrapper.find('.box')).to.have.length(questions.length);
  })

  it('should render all answers', () => {
    wrapper.setState({
      poll,
      questions
    })
  
    let numOfAnswers = 0;
    questions.forEach(question => {
      numOfAnswers += question.answers.length
    })
    expect(wrapper.find('p')).to.have.length(numOfAnswers);
  })

  it('should render a loading-placeholder, if no poll or no questions are provided', () => {
    wrapper.setState({
      poll: {},
      questions: []
    }, () => {
      expect(wrapper.find('div')).to.have.length(1);
      expect(wrapper.find('div')).hasClass('loadingPollAlert').to.equal(true);
    })
    
    wrapper.setState({
      poll,
      questions: []
    }, () => {
      expect(wrapper.find('div')).to.have.length(1);
      expect(wrapper.find('div')).hasClass('loadingPollAlert').to.equal(true);  
    })
  })

  it('should have a next question button for each button except the last', () => {
    wrapper.setState({
      poll,
      questions
    })
    expect(wrapper.find('#nextQuestionButton')).to.have.length(questions.length-1);
  })
  
  it.skip('clicking the nextQuestion button should trigger the next Question function', () => {
    // ...
  });

  it.skip('clicking the closeQuestion button should trigger closePoll function', () => {
    // ...
  });

  it.skip('should call fetchPolls when being mounted', () => {
    // ...
  })

  // it('should have a function nextQuestion that activates the next question', () => {
  //   let questions = [{active: true}, {active: false}];
  //   wrapper.setState({questions: questions});
  //   expect(wrapper.state('questions')[0].active.to.equal(true));
  //   expect(wrapper.state('questions')[1].active.to.equal(false));

  //   wrapper.instance().nextQuestion(0);

  //   expect(wrapper.state('questions')[0].active.to.equal(false));
  //   expect(wrapper.state('questions')[1].active.to.equal(true));
  // })

  // write more tests 
})

