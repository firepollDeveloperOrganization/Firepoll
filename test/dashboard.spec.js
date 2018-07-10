import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import testData from './testData';
import Dashboard from '../client/src/managementClient/dashboard.jsx';


configure({ adapter: new Adapter() })

describe('<Dashboard />', () => {
  it('renders the dashboard component if user is logged in', () => {
    const dashboard = shallow(<Dashboard user={'Rose'}/>);
    expect(dashboard.find('#dashboard').length).equal(1);
  });
  it('renders a login component if user is not logged in', () => {
    const dashboard = shallow(<Dashboard user={null}/>);
    expect(dashboard.find('#dashboard').length).equal(0);
    expect(dashboard.find('Link').length).equal(1);
  });
  it.skip('renders a heading that tells the user they have no polls if there are no polls', () => {
    expect(0).equal(1);
  });
  it.skip('renders a poll container if filtered polls exist', () => {
    expect(0).equal(1);
  });
  it ('renders four buttons ', () => {
    const dashboard = shallow(<Dashboard user={'Rose'}/>);
    expect(dashboard.find('#polls-filter').length).equal(1);
    expect(dashboard.find('#polls-filter').children().length).equal(4);
  });
})