import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EmptyState from './index';

describe('EmptyState. Shows an empty state dialog when there are no slides', () => {
  it('should render correctly', () => {
    const comp = shallow(<EmptyState handleClick={() => null} />);
    expect(toJson(comp)).toMatchSnapshot();
  });

  it('should fire handleClick', () => {
    const firer = jest.fn();
    const comp = shallow(<EmptyState handleClick={firer} />);

    comp.find('.clickable').first().simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
  });
});
