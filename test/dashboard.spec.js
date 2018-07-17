import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Poll from './testData';
import Dashboard from '../client/src/managementClient/dashboard.jsx';

configure({ adapter: new Adapter() })

describe.skip('<Dashboard />', () => {
  it('renders the dashboard component if user is logged in', () => {
    const dashboard = shallow(<Dashboard user={'Rose'}/>);
    expect(dashboard.find('#dashboard').length).equal(1);
  });
  it('renders a login component if user is not logged in', () => {
    const dashboard = shallow(<Dashboard user={null}/>);
    expect(dashboard.find('#dashboard').length).equal(0);
    expect(dashboard.find('Link').length).equal(1);
  });
  it('renders a heading that tells the user they have no polls if there are no polls', function() {
    const dashboard = shallow(<Dashboard user={'Rose'}/>);
    dashboard.setState({filteredPolls: []});
    expect(dashboard.find('#no-polls-notification').length).equal(1);
  });
  it('render a polls container if filtered polls exist', function() {
    const dashboard = shallow(<Dashboard user={'Rose'}/>);
    dashboard.setState({filteredPolls: [Poll]});
    expect(dashboard.state('filteredPolls')).to.eql([Poll]);
    expect(dashboard.find('#no-polls-notification').length).equal(0);
    expect(dashboard.find('#filtered-polls').length).equal(1);
  });
  it ('renders four buttons for poll filtering', () => {
    const dashboard = shallow(<Dashboard user={'Rose'}/>);
    expect(dashboard.find('#polls-filter').length).equal(1);
    expect(dashboard.find('#polls-filter').children().length).equal(4);
  });
})