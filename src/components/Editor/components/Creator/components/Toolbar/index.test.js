import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Toolbar from './index';

describe('The Toolbar. This shows the main controls', () => {
  it('should render correctly', () => {
    const comp = shallow(
      <Toolbar
        handleSave={() => null}
        handleSettingsClick={() => null}
        handlePresentClick={() => null}
        title="Make America Great Again"
        authorName="Donald Trump"
      />
    );
    expect(toJson(comp)).toMatchSnapshot();
  });

  it('should have the editor-toolbar class', () => {
    const comp = shallow(
      <Toolbar
        handleSave={() => null}
        handleSettingsClick={() => null}
        handlePresentClick={() => null}
        title="Make America Great Again"
        authorName="Donald Trump"
      />
    );
    expect(comp.find('.editor-toolbar')).toHaveLength(1);
  });

  it('should fire handleSave', () => {
    const firer = jest.fn();
    const comp = shallow(
      <Toolbar
        handleSave={firer}
        handleSettingsClick={() => null}
        handlePresentClick={() => null}
        title="Make America Great Again"
        authorName="Donald Trump"
      />
    );

    comp.find('#save-button').simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
  });

  it('should fire handleSettingsClick', () => {
    const firer = jest.fn();
    const comp = shallow(
      <Toolbar
        handleSave={() => null}
        handleSettingsClick={firer}
        handlePresentClick={() => null}
        title="Make America Great Again"
        authorName="Donald Trump"
      />
    );

    comp.find('#settings-button').simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
  });

  it('should fire handlePresentClick', () => {
    const firer = jest.fn();
    const comp = shallow(
      <Toolbar
        handleSave={() => null}
        handleSettingsClick={() => null}
        handlePresentClick={firer}
        title="Make America Great Again"
        authorName="Donald Trump"
      />
    );

    comp.find('#present-button').simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
  });
});
