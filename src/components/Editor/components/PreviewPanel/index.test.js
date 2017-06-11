import { shallow } from 'enzyme';
import React from 'react';
import PreviewPanel from './index';

it('should render without failing', () => {
    shallow(<PreviewPanel slides={[]}/>)
});

it('should have the preview-panel class', () => {
   const comp = shallow(<PreviewPanel slides={[]}/>);
   expect(comp.find('.preview-panel')).toHaveLength(1);
});