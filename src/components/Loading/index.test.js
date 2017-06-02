import React from 'react';
import { shallow } from 'enzyme';
import Loading from './index';

it('renders without failing', () => {
    shallow(<Loading/>)
});