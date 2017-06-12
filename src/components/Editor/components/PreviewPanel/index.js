import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import StaticSlide from './components/StaticSlide';
import { GridList } from 'material-ui/GridList';

const PreviewPanel = (props) => {
    const { slides, wpId, version } = props;

    const staticSlides = slides
        .map((singleSlide, index) => <StaticSlide
            key={`static-slide-${index}`}
            slide={singleSlide} wpId={wpId}
            slideNumber={index + 1}
            version={version} />);

    return (
        <div className="preview-panel">
            {staticSlides}
        </div>
    )
};

PreviewPanel.propTypes = {
    slides: PropTypes.array.isRequired,
    wpId: PropTypes.number.isRequired,
    version: PropTypes.number.isRequired,
};

export default PreviewPanel;