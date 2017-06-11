import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import StaticSlide from './components/StaticSlide';

const PreviewPanel = (props) => {
    const { slides, wpId, version } = props;

    const staticSlides = slides
        .map(singleSlide => <StaticSlide slide={singleSlide} wpId={wpId} version={version} />);

    return (
        <div className="preview-panel">
            {{staticSlides}}
        </div>
    )
};

PreviewPanel.propTypes = {
    slides: PropTypes.array.isRequired,
    wpId: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
};

export default PreviewPanel;