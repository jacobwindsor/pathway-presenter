import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const PreviewPanel = (props) => {
    const { slides } = props;

    return (
        <div className="preview-panel">

        </div>
    )
};

PreviewPanel.propTypes = {
    slides: PropTypes.array.isRequired
};

export default PreviewPanel;