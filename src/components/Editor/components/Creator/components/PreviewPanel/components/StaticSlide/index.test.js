import React from 'react';
import { shallow } from 'enzyme';
import StaticSlide from './index';

it('renders without failing', () => {
    shallow(<StaticSlide
        slide={{targets: []}}
        wpId={'WP4'}
        version={0}
        slideNumber={1}
        onClick={() => null}
        handleRemove={() => null}
    />)
});

it('should have the static-slide class', () => {
    const comp = shallow(<StaticSlide
        slide={{targets: []}}
        wpId={'WP4'}
        version={0}
        slideNumber={1}
        onClick={() => null}
        handleRemove={() => null}
    />);
    expect(comp.find('.static-slide')).toHaveLength(1);
});