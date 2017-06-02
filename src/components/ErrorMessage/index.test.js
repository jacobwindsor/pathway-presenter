import React from 'react';
import { shallow } from'enzyme';
import ErrorMessage from './index';

it('renders without crashing', () => {
    shallow(<ErrorMessage message="Some error"/>)
});

it('Shows the correct error message', () => {
    const comp = shallow(<ErrorMessage message="My custom error"/>);
    const pTag = <p>Error: My custom error</p>;
    expect(comp.contains(pTag)).toBeTruthy();
})