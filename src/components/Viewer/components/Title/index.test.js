import React from 'react';
import { shallow } from 'enzyme';
import Title from './index';

it('should render without failing', () => {
    shallow(<Title/>)
});

it('Should show the title', () => {
    const comp = shallow(<Title title="My title"/>);
    expect(comp.find('h1')).toHaveLength(1);
    expect(comp.first('h1').contains('My title')).toBeTruthy();
});