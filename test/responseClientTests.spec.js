import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import testData from './testData';

import ResponseClient from '../client/src/responseClient/responseClient.jsx';

configure({ adapter: new Adapter() })

describe.skip('Response Client Tests', function() {

  var wrapper;
  var responseClient;

  window = {};

  global.window.localStorage = {
    getItem: () => { return '{}'; },
    setItem: () => {}
  };

  global.window.location = {};
  global.window.location.pathname = 'xxxxxxxxxx1a2b3c4d5e6f';

  before(function() {
    let match = {params: {}};
    match.params.id = '1a2b3c4d5e6f'
    wrapper = shallow(<ResponseClient/>);
    var poll = testData
    poll.active = true;
    var questions = testData.questions;
    questions.forEach((question, i) => {
      question.active = true;
    });
  });

  it('When provided with an invalid poll ID in the URL, poll data should be false', function() {
    expect(wrapper.state('poll')).to.equal(false);  
  });
  
  it('When provided with an invalid poll ID in the URL, exists should be false', function() {
    expect(wrapper.state('exists')).to.equal(false);  
  });

});