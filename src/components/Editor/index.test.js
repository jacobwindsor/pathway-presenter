import React from 'react';
import { shallow } from 'enzyme';
import Editor from './index';
import Viewer from '../Viewer';

it('Should render without failing', () => {
    shallow(<Editor presId="my-pres"/>)
});

it('should have the editor-wrapper class', () => {
    const comp = shallow(<Editor presId="my-pres" />);
    expect(comp.find('.editor-wrapper')).toHaveLength(1)
});

it('should have a viewer', () => {
    const comp = shallow(<Editor presId="my-pres" />);
    expect(comp.find(Viewer)).toHaveLength(1)
});