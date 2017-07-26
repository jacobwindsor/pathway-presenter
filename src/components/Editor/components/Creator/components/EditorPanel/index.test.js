import React from 'react';
import { shallow } from 'enzyme';
import EditorPanel from './index';

it('should render correctly', () => {
  shallow(
    <EditorPanel
      hasSlideChanged={false}
      handleTargetChipClick={() => null}
      handleCancelTarget={() => null}
      slideIndex={0}
      slide={{}}
    />
  );
});
