import React from 'react';
import { shallow } from 'enzyme';
import Creator from './index';
import toJson from 'enzyme-to-json';

describe('The Creator. Interface for actually creating the presentations with all controls', () => {
  it('should render correctly', () => {
    const presentation = {
      title: 'My title',
      wpId: 'WP4',
      authorName: 'Ronald McDonald',
      version: 0,
      slides: [
        {
          title: 'My slide',
          targets: []
        }
      ]
    };

    const comp = shallow(
      <Creator
        presentation={presentation}
        handleSave={() => null}
        handleDelete={() => null}
      />
    );
    expect(toJson(comp)).toMatchSnapshot();
  });
});
