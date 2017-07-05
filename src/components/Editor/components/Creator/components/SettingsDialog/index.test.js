import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SettingsDialog from './index';

describe('The SettingsDialog. Allows to edit global settings that affect all slides', () => {
  it('should render correctly', () => {
    const comp = shallow(
      <SettingsDialog
        isOpen
        handleClose={() => null}
        handleSave={() => null}
        version={0}
        wpId="WP4"
        handleDelete={() => null}
        authorName="Miles Davis"
      />
    );

    expect(toJson(comp)).toMatchSnapshot();
  });
});
