import React from 'react';
import './index.css';
import board from '../../../../../../../../assets/board_64.svg';
import IconButton from 'material-ui/IconButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

const StaticSlide = props => {
  const { slideNumber, handleRemove, isActive, onClick, slide } = props;

  const onRemoveClick = e => {
    // Stop event bubbling to handleClick
    e.stopPropagation();
    handleRemove();
  };

  return (
    <Paper
      className={`static-slide ${isActive ? 'active' : null}`}
      onClick={onClick}
    >
      <IconButton
        className="remove-button"
        tooltip="Remove slide"
        onClick={onRemoveClick}
      >
        <RemoveCircle />
      </IconButton>
      <img
        src={board}
        alt="Slide Preview"
        style={{
          margin: '0 auto',
          display: 'block',
          transform: 'translateY(50%)',
          top: '50%'
        }}
      />
      <div className="indicator">
        <h1 className="number">
          {slideNumber}
        </h1>
        {slide.title
          ? <h2 className="title">
              ({slide.title})
            </h2>
          : null}
      </div>
    </Paper>
  );
};

StaticSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  wpId: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  slideNumber: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default StaticSlide;
