import React from 'react';
import { shallow } from'enzyme';
import ErrorMessage from './index';

it('renders without crashing', () => {
    shallow(<ErrorMessage message="Some error"/>)
});

it('Shows the correct error message', () => {
    const comp = shallow(<ErrorMessage message="My custom error"/>);
    expect(comp.contains('My custom error')).toBeTruthy();
});