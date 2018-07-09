import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import testData from './testData';

import ResponseClient from '../client/src/responseClient/responseClient.jsx';

configure({ adapter: new Adapter() })

describe('Response Client Tests', function() {

  var wrapper;
  var responseClient;

  before(function() {
    let match = {params: {}};
    match.params.id = '2b3c4d5e6f7g'
    wrapper = shallow(<ResponseClient/>);
    poll = testData
  })


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
  });

});