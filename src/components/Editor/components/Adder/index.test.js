import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adder from './index';

describe('The Adder. Shows a form to create a new presentation', () => {
  it('should render correctly', () => {
    const comp = shallow(
      <Adder handleCreate={() => null} handleSelect={() => null} />
    );
    expect(toJson(comp)).toMatchSnapshot();
  });
});
