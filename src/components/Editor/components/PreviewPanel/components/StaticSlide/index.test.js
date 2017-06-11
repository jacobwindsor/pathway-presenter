import React from 'react';
import { shallow } from 'enzyme';
import StaticSlide from './index';

it('renders without failing', () => {
    shallow(<StaticSlide slide={{targets: []}} wpId={'WP4'} version={0} />)
});

it('should have the static-slide class', () => {
    const comp = shallow(<StaticSlide slide={{targets: []}} wpId={'WP4'} version={0} />);
    expect(comp.find('.static-slide')).toHaveLength(1);
})