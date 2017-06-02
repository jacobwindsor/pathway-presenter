import React from 'react';
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import './index.css';

export default (props) => {
    return (
        <div className="controls">
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
    )
}