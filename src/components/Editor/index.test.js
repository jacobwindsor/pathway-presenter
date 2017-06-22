import React from 'react';
import { shallow, mount } from 'enzyme';
import Editor from './index';

it('Should render without failing', () => {
    shallow(<Editor presId="my-pres"/>)
});