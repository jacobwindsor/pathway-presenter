import { Pvjs } from '@wikipathways/pvjs';
import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';

class Diagram extends Component {
    render() {
        const { wpId, version, showPanZoomControls, onReady } = this.props;

        return (
            <div className="diagram-wrapper">
                <Pvjs about={`http://identifiers.org/wikipathways/WP${wpId}`}
                      version={version}
                      showPanZoomControls={showPanZoomControls}
                      onReady={onReady} />;
            </div>
        )
    }
}

Diagram.propTypes = {
    wpId: PropTypes.number.isRequired,
    version: PropTypes.number.isRequired,
    showPanZoomControls: PropTypes.bool.isRequired,
    onReady: PropTypes.func
};

export default Diagram;