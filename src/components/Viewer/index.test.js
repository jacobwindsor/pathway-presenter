import React from 'react';
import { shallow } from 'enzyme';
import Viewer from "./index";

it('renders without crashing', () => {
    shallow(<Viewer presId="1234"/>)
});