import React from 'react';
import { shallow } from 'enzyme';
import Viewer from "./index";

it('renders without crashing', () => {
    shallow(<Viewer presId="1234"/>)
});

it('has the correct wrapper class name', () => {
    const comp = shallow(<Viewer presId="1234"/>);
    expect(comp.find('.presentation-viewer')).toHaveLength(1);
});

