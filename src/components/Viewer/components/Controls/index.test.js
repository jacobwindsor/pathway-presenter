import { shallow } from 'enzyme';
import React from 'react';
import Controls from './index';

it('should render without failing', () => {
    shallow(
        <Controls
            onBackward={() => null}
            onForward={() => null}
            handleToggleFullScreen={() => null}
            isFullScreen={false}
        />
    )
});

it('should have a wrapper component', () => {
    const comp = shallow(
        <Controls
            onBackward={() => null}
            onForward={() => null}
            handleToggleFullScreen={() => null}
            isFullScreen={false}
        />
    );
    expect(comp.find('.viewer-controls')).toHaveLength(1);
});

it('Should have back and forward buttons', () => {
    const comp = shallow(
        <Controls
            onBackward={() => null}
            onForward={() => null}
            handleToggleFullScreen={() => null}
            isFullScreen={false}
        />
    );
    expect(comp.find('.backward')).toHaveLength(1);
    expect(comp.find('.forward')).toHaveLength(1);
});

it('should fire onForward on click', () => {
    const firer = jest.fn();
    const comp = shallow(
        <Controls
            onBackward={() => null}
            onForward={firer}
            handleToggleFullScreen={() => null}
            isFullScreen={false}
        />
    );
    const button = comp.find('.forward');
    button.simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
});

it('should fire onBackward on click', () => {
    const firer = jest.fn();
    const comp = shallow(
        <Controls
            onBackward={firer}
            onForward={() => null}
            handleToggleFullScreen={() => null}
            isFullScreen={false}
        />
    );
    const button = comp.find('.backward');
    button.simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
});

it('should fire handleToggleFullScreen', () => {
    const firer = jest.fn();
    const comp = shallow(
        <Controls
            onBackward={() => null}
            onForward={() => null}
            handleToggleFullScreen={firer}
            isFullScreen={false}
        />
    );
    const button = comp.find('.fullscreen');
    button.simulate('touchTap');
    expect(firer).toHaveBeenCalledTimes(1);
});