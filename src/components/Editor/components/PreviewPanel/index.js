import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import StaticSlide from './components/StaticSlide';

const PreviewPanel = (props) => {
    const { slides, wpId, version, onClick } = props;

    const staticSlides = slides
        .map((singleSlide, index) => <StaticSlide
            key={`static-slide-${index}`}
            slide={singleSlide} wpId={wpId}
            slideNumber={index + 1}
            version={version}
            onClick={onClick} />);

    return (
        <div className="preview-panel">
            {staticSlides}
        </div>
    )
};

PreviewPanel.propTypes = {
    slides: PropTypes.array.isRequired,
    wpId: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PreviewPanel;