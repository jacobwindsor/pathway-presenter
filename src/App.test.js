import React from 'react';
import { shallow } from'enzyme';
import App from './App';
import Viewer from './components/Viewer';
import Editor from './components/Editor';

it('renders without crashing', () => {
  shallow(<App/>);
});

it('Contains a viewer', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.find(Viewer)).toHaveLength(1);
});

it('contains an editor', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Editor)).toHaveLength(1);
});