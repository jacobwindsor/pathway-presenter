import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DeleteConfirmDialog from './index';

describe('The DeleteConfirmDialog. Shows a warning message before deleting the presentation', () => {
  it('should render correctly', () => {
    const comp = shallow(
      <DeleteConfirmDialog
        handleDelete={() => null}
        handleClose={() => null}
        isOpen
      />
    );
    expect(toJson(comp)).toMatchSnapshot();
  });
});
