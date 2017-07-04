import React from 'react';
import { shallow } from 'enzyme';
import Diagram from './index';

it('renders without crashing', () => {
  shallow(
    <Diagram
      wpId={'WP4q'}
      version={0}
      showPanZoomControls={true}
      slide={{ targets: [] }}
    />
  );
});
