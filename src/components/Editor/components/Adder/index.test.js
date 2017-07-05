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

  it('should fire handleCreate', () => {
    const firer = jest.fn();
    const comp = shallow(
      <Adder handleCreate={firer} handleSelect={() => null} />
    );
    comp.find('.create-button').simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
  });
});
