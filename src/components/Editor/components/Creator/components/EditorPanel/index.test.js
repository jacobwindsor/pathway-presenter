import React from 'react';
import { shallow } from 'enzyme';
import EditorPanel from './index';

it('should render correctly', () => {
   shallow(
       <EditorPanel
           slideIndex={0}
           slide={{}}
       />
   );
});