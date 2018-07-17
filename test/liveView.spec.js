
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import testData from './testData';
import sinon from 'sinon';
import {firepoll, realTimeDB} from '../client/src/firepollManagementClient';
import axios from 'axios';

import Live from '../client/src/managementClient/live.jsx';

configure({ adapter: new Adapter() })

describe.skip('Live View Component', function() {

var wrapper;
var poll;
var questions;
var match;

before(function() {
  match = {params: {}};
  match.params.id = '1a2b3c4d5e6f';
  poll = testData;
}); 

var fakeComponentDidMount;
beforeEach(function() {
  fakeComponentDidMount = sinon.stub(Live.prototype, 'componentDidMount');
  fakeComponentDidMount.callsFake(function () {});
  wrapper = shallow(<Live match={match} user={'Dorothea Schoepfer'} email={'dorothea.schoepfer@gmail.com'}/>);
  wrapper.setState({
    poll: null,
    questions: null,
    closed: false
  })
  poll.active = true;
  questions = testData.questions;
  questions.forEach((question, i) => {
    if (i === 0) {
      question.active = true;
    } else {
      question.active = false;
    }
  })
})

afterEach(function () {
  fakeComponentDidMount.restore();
});

it('should mount', function() {
  expect(fakeComponentDidMount.called).to.equal(true);
}) 


it('should start with no poll, no questions and closed set to false.', function() {
    expect(wrapper.state('poll')).to.equal(null);
    expect(wrapper.state('questions')).to.equal(null);
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
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').hasClass('loadingPollAlert')).to.equal(true);
  
  wrapper.setState({
    questions: []
  })      
  expect(wrapper.find('div')).to.have.length(1);
  expect(wrapper.find('div').hasClass('loadingPollAlert')).to.equal(true);  
})

it('should have a next question button for each button except the last', () => {
  wrapper.setState({
    poll,
    questions
  })
  expect(wrapper.find('#nextQuestionButton')).to.have.length(questions.length-1);
})

it('clicking the nextQuestion button should trigger the next Question function', () => {
  let fakeNextQuestion = sinon.stub(wrapper.instance(), 'nextQuestion');
  fakeNextQuestion.callsFake(() => {});
  expect(fakeNextQuestion.called).to.equal(false);
  wrapper.setState({
    poll,
    questions
  })
  wrapper.find('#nextQuestionButton').simulate('click');
  expect(fakeNextQuestion.called).to.equal(true);
  fakeNextQuestion.restore();
});

it('nextQuestion should call firepoll to update the current and the next question', () => {
  let fakeFirepollUpdateQuestion = sinon.stub(firepoll, "updateQuestion");
  let callCount = 0;
  fakeFirepollUpdateQuestion.callsFake(() => {callCount++;});
  wrapper.setState({
    poll,
    questions
  })
  wrapper.find('#nextQuestionButton').simulate('click');
  
  expect(fakeFirepollUpdateQuestion.calledTwice).to.be.true;
  expect(wrapper.state('questions')[0].active).to.be.false;
  expect(wrapper.state('questions')[1].active).to.be.true;
  
  fakeFirepollUpdateQuestion.restore();
})

it('clicking the closeQuestion button should trigger closePoll function', () => {
  let fakeClosePoll = sinon.stub(wrapper.instance(), 'close');
  fakeClosePoll.callsFake(() => {});
  expect(fakeClosePoll.called).to.equal(false);
  wrapper.setState({
    poll,
    questions
  })
  wrapper.find('#closePollButton').simulate('click');
  expect(fakeClosePoll.called).to.equal(true);
  fakeClosePoll.restore();
});

it('should call fetchPolls when being mounted', () => {
  fakeComponentDidMount.restore();
  let fakeFetchPolls = sinon.stub(Live.prototype, 'fetchPoll');
  let wrapper = shallow(<Live match={match} user={'Dorothea Schoepfer'} email={'dorothea.schoepfer@gmail.com'}/>);
  expect(fakeFetchPolls.calledOnce).to.be.true;
});

});