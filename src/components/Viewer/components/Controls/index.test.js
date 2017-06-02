import { shallow } from 'enzyme';
import React from 'react';
import Controls from './index';

it('should render without failing', () => {
    shallow(<Controls />)
});

it('should have a wrapper component', () => {
    const comp = shallow(<Controls/>);
    expect(comp.find('.controls')).toHaveLength(1);
});

it('Should have back and forward buttons', () => {
    const comp = shallow(<Controls/>);
    expect(comp.find('.backward')).toHaveLength(1);
    expect(comp.find('.forward')).toHaveLength(1);
});

it('should fire onForward on click', () => {
    const firer = jest.fn();
    const comp = shallow(<Controls onForward={firer} />);
    const button = comp.find('.forward');
    button.simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
});

it('should fire onBackward on click', () => {
    const firer = jest.fn();
    const comp = shallow(<Controls onBackward={firer} />);
    const button = comp.find('.backward');
    button.simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
});