import React from 'react';
import './index.css';
import board from '../../../../../../../../assets/board_64.svg';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

const StaticSlide = (props) => {
    const { slideNumber, onClick } = props;

    const handleClick = () => {
        onClick(slideNumber)
    };

    return (
        <Paper className="static-slide" onClick={handleClick}>
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
};

export default StaticSlide;