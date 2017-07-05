import React from 'react';
import { shallow } from 'enzyme';
import Loading from './index';
import toJson from 'enzyme-to-json';

it('renders without failing', () => {
  const comp = shallow(<Loading />);
  expect(toJson(comp)).toMatchSnapshot();
});
