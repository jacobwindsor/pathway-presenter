import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import StaticSlide from './components/StaticSlide';
import { Scrollbars } from 'react-custom-scrollbars';

const PreviewPanel = (props) => {
    const { slides, wpId, version, onClick, height, width, handleSlideRemove, activeSlideIndex } = props;

    const staticSlides = slides
        .map((singleSlide, index) => <StaticSlide
            handleRemove={() => handleSlideRemove(index)}
            key={`static-slide-${index}`}
            slide={singleSlide} wpId={wpId}
            slideNumber={index + 1}
            isActive={activeSlideIndex === index}
            version={version}
            onClick={onClick} />);

    return (
        <Scrollbars
          className="preview-panel"
          style={{ width, height, whiteSpace: 'nowrap', overflowY: 'hidden' }}>
            {staticSlides}
        </Scrollbars>
    )
};

PreviewPanel.propTypes = {
    slides: PropTypes.array.isRequired,
    wpId: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    handleSlideRemove: PropTypes.func.isRequired, // Called with the index to remove
    activeSlideIndex: PropTypes.number.isRequired,
};

export default PreviewPanel;