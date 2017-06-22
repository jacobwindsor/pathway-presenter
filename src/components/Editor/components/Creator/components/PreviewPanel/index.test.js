import { shallow } from 'enzyme';
import React from 'react';
import PreviewPanel from './index';

it('should render without failing', () => {
    shallow(<PreviewPanel slides={[]} wpId="WP4" version={0} onClick={() => null}/>)
});

it('should have the preview-panel class', () => {
   const comp = shallow(<PreviewPanel slides={[]} wpId="WP4" version={0} onClick={() => null}/>);
   expect(comp.find('.preview-panel')).toHaveLength(1);
});