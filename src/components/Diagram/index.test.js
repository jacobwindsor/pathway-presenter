import React from 'react';
import { shallow } from 'enzyme';
import Diagram from './index';
import toJson from 'enzyme-to-json';

describe('The diagram component. Renders just the Pvjs diagram', () => {
  it('renders without crashing', () => {
    const comp = shallow(
      <Diagram
        wpId={'WP4'}
        version={0}
        showPanZoomControls={true}
        slide={{ targets: [] }}
      />
    );

    expect(toJson(comp)).toMatchSnapshot();
  });

  it('should have the diagram-wrapper class', () => {
    const comp = shallow(
      <Diagram
        wpId="WP4"
        version={0}
        showPanZoomControls
        slide={{ targets: [] }}
      />
    );
    expect(comp.find('.diagram-wrapper')).toHaveLength(1);
  });

  it('should have only one child and that is Pvjs', () => {
    const comp = shallow(
      <Diagram
        wpId="WP4"
        version={0}
        showPanZoomControls
        slide={{ targets: [] }}
      />
    );
    expect(comp.children()).toHaveLength(1);
  });

  it('should pass in action (manipulation) props correctly to Pvjs', () => {
    const slide = {
      targets: [
        {
          highlighted: true,
          highlightedColor: 'red',
          entityId: '1234',
          panned: true
        },
        {
          entityId: '5678',
          highlighted: false,
          hidden: true
        },
        {
          entityId: '9123',
          highlighted: true,
          highlightedColor: 'blue',
          panned: true,
          zoomed: true
        },
        {
          entityId: '9234',
          highlighted: false,
          panned: true,
          zoomed: true
        }
      ]
    };

    const comp = shallow(
      <Diagram wpId="WP4" version={0} showPanZoomControls slide={slide} />
    );

    const shouldBeHighlighted = [
      {
        entityId: '1234',
        color: 'red'
      },
      {
        entityId: '9123',
        color: 'blue'
      }
    ];

    const shouldBeZoomed = ['9123', '9234'];
    const shouldBePanned = ['1234', '9123', '9234'];
    const shouldBeHidden = ['5678'];

    const pvjs = comp.children().first();
    expect(pvjs.prop('highlightedEntities')).toEqual(shouldBeHighlighted);
    expect(pvjs.prop('zoomedEntities')).toEqual(shouldBeZoomed);
    expect(pvjs.prop('pannedEntities')).toEqual(shouldBePanned);
    expect(pvjs.prop('hiddenEntities')).toEqual(shouldBeHidden);
  });
});
