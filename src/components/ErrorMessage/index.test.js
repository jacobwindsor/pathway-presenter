import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './index';
import toJson from 'enzyme-to-json';

it('renders without crashing', () => {
  const comp = shallow(<ErrorMessage message="Some error" />);
  expect(toJson(comp)).toMatchSnapshot();
});

it('Shows the correct error message', () => {
  const comp = shallow(<ErrorMessage message="My custom error" />);
  expect(comp.contains('My custom error')).toBeTruthy();
});
