import React from 'react';
import './index.css';
import board from '../../../../../../../../assets/board_64.svg';
import IconButton from 'material-ui/IconButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

const StaticSlide = (props) => {
    const { slideNumber, onClick, handleRemove } = props;

    const handleClick = () => {
        onClick(slideNumber)
    };

    const onRemoveClick = e => {
        // Stop event bubbling to handleClick
        e.stopPropagation();
        handleRemove()
    };

    return (
        <Paper className="static-slide" onClick={handleClick}>
            <IconButton className="remove-button" tooltip="Remove slide" onClick={onRemoveClick}>
                <RemoveCircle/>
            </IconButton>
            <img src={board} style={{margin: '0 auto', display: 'block', transform: 'translateY(50%)', top: '50%'}} />
            <div className="title">
                {slideNumber}
            </div>
        </Paper>
    )
};

StaticSlide.propTypes = {
    slide: PropTypes.object.isRequired,
    wpId: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
    slideNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
};

export default StaticSlide;