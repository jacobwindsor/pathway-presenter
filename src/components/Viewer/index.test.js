import React from 'react';
import { shallow } from 'enzyme';
import Viewer from './index';
import toJson from 'enzyme-to-json';

describe('The Viewer. This shows presentations in "presentation mode"', () => {
  it('renders without crashing', () => {
    const comp = shallow(<Viewer presId="1234" />).find('Viewer').shallow();
    expect(toJson(comp)).toMatchSnapshot();
  });

  it('should show a loading spinner', () => {
    const comp = shallow(<Viewer presId="1234" />).find('Viewer').shallow();
    expect(comp.dive().name()).toEqual('Spinner');
    expect(comp.dive().is('.loading-spinner')).toBeTruthy();
  });

  it('should show a presentation', () => {
    const comp = shallow(<Viewer presId="1234" />).find('Viewer').shallow();
    comp.setState({
      presentation: {
        wpId: 'WP4',
        version: 0,
        title: 'My pres',
        author: 'Nanny McPhee',
        slides: [
          {
            title: 'First slide',
            targets: []
          }
        ]
      },
      loading: false,
      error: null,
      activeSlideIndex: 0
    });

    expect(comp.find('.loading-spinner')).toHaveLength(0);
    expect(comp.find('.presentation-viewer')).toHaveLength(1);
    expect(comp.find('Controls')).toHaveLength(1);

    expect(toJson(comp)).toMatchSnapshot();
  });
});
