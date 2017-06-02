import React from 'react';
import { shallow } from'enzyme';
import App from './App';
import Viewer from './components/Viewer';

it('renders without crashing', () => {
  shallow(<App/>);
});

it('Contains a viewer', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.find(Viewer)).toHaveLength(1);
});
