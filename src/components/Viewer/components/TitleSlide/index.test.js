import React from 'react';
import { shallow } from 'enzyme';
import TitleSlide from './index';

it('Should render without failing', () => {
    shallow(<TitleSlide title="My title" authorName="Me, myself & I" />);
});

it('should have a wrapper', () => {
    const comp = shallow(<TitleSlide title="My title" authorName="Me, myself & I" />);
    expect(comp.find('.title-slide')).toHaveLength(1);
});

it('should have a title', () => {
    const comp = shallow(<TitleSlide title="My title" authorName="Me, myself & I" />);
    expect(comp.contains(<h1>My title</h1>)).toBeTruthy();
});

it('should show the author', () => {
    const comp = shallow(<TitleSlide title="My title" authorName="Me, myself & I" />);
    expect(comp.contains(<h2>Me, myself & I</h2>)).toBeTruthy();
});