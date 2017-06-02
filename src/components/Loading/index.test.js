import React from 'react';
import { shallow } from 'enzyme';
import Loading from './index';

it('renders without failing', () => {
    shallow(<Loading/>)
});

it('Shows a loading indicator', () => {
    const comp = shallow(<Loading/>);
    expect(comp.contains(<p>Loading...</p>)).toBeTruthy();
});