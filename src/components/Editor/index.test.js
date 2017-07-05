import React from 'react';
import { shallow } from 'enzyme';
import Editor from './index';
import toJson from 'enzyme-to-json';
import injectTapEventPlugin from 'react-tap-event-plugin';

describe('The Editor. This allows creation and updating of presentations', () => {
  beforeAll(() => {
    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin();
  });

  it('Should render without failing', () => {
    const comp = shallow(<Editor presId="my-pres" />);
    expect(toJson(comp)).toMatchSnapshot();
  });

  it('should show a loading indicator', () => {
    const comp = shallow(<Editor presId="my-pres" />);
    expect(comp.dive().find('.loading-spinner')).toHaveLength(1);
  });

  it('should show the adder form', () => {
    const comp = shallow(<Editor />);
    comp.setState({
      loading: false,
      presentation: null
    });
    expect(comp.find('SuccessContent').dive().find('Adder')).toHaveLength(1);
    expect(
      toJson(comp.find('SuccessContent').dive().find('Adder'))
    ).toMatchSnapshot();
  });

  it('should show the creator interface', () => {
    const comp = shallow(<Editor presId="my-pres" />);
    comp.setState({
      loading: false,
      presentation: {
        title: 'My pres',
        authorName: 'Donald Duck',
        wpId: 'WP4',
        version: 0,
        slides: []
      }
    });
    expect(comp.find('SuccessContent').dive().find('Creator')).toHaveLength(1);
    expect(
      toJson(comp.find('SuccessContent').dive().find('Creator'))
    ).toMatchSnapshot();
  });

  it('should show an error', () => {
    const comp = shallow(<Editor presId="my-pres" />);
    comp.setState({
      error: {
        message: 'An error'
      },
      loading: false
    });
    expect(comp.find('ErrorContent')).toHaveLength(1);
    expect(toJson(comp.find('ErrorContent'))).toMatchSnapshot();
    expect(
      comp.find('ErrorContent').dive().find('ErrorMessage').prop('message')
    ).toEqual('An error');
  });
});
