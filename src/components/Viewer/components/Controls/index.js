import React from 'react';
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import NavigationFullscreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit';
import PropTypes from 'prop-types';
import './index.css';

const Controls = props => {
    return (
        <div className="controls">
            <div className="left">
                <IconButton onTouchTap={props.handleToggleFullScreen}>
                    { props.isFullScreen ?
                        <NavigationFullscreen/> :
                        <NavigationFullscreenExit/>
                    }
                </IconButton>
            </div>
            <div className="right">
                <IconButton
                    className="backward"
                    onTouchTap={props.onBackward}>
                    <ArrowBack/>
                </IconButton>
                <IconButton className="forward"
                            onTouchTap={props.onForward}>
                    <ArrowForward/>
                </IconButton>
            </div>
        </div>
    )
};

Controls.propTypes = {
    onBackward: PropTypes.func.isRequired,
    onForward: PropTypes.func.isRequired,
    handleToggleFullScreen: PropTypes.func.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
};

export default Controls;