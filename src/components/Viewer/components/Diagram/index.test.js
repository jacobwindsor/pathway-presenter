import React from 'react';
import { shallow } from 'enzyme';
import Diagram from './index';

it('renders without crashing', () => {
    shallow(<Diagram wpId="34" version="0" showPanZoomControls="true" slide="0"/>)
});

