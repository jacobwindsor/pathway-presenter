import { Pvjs } from '@wikipathways/pvjs';
import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { isMatch, difference } from 'lodash';

class Diagram extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onPvjsReady = (pvjsRef) => {
        const { onReady } = this.props;
        this.setState({manipulator: pvjsRef.manipulator});
        onReady();
    }

    render() {
        const { wpId, version, showPanZoomControls, isHidden, slide } = this.props;
        const targets = slide.targets;

        const getEntityIds = entities => entities.map(singleEntity => singleEntity.entityId);

        const highlightedEntities = targets
            .filter(singleTarget => singleTarget.highlighted)
            .map(singleTarget => Object.assign({},
                {entityId: singleTarget.entityId, color: singleTarget.highlightedColor})
            );
        const pannedEntities = getEntityIds(targets
            .filter(singleTarget => singleTarget.panned));
        const zoomedEntities = getEntityIds(targets
            .filter(singleTarget => singleTarget.zoomed));
        const hiddenEntities = getEntityIds(targets
            .filter(singleTarget => singleTarget.hidden));

        return (
            <div className={`diagram-wrapper ${isHidden? 'isHidden' : ''}`}>
                <Pvjs about={`http://identifiers.org/wikipathways/WP${wpId}`}
                      version={version}
                      showPanZoomControls={showPanZoomControls}
                      highlightedEntities={highlightedEntities}
                      pannedEntities={pannedEntities}
                      zoomedEntities={zoomedEntities}
                      hiddenEntities={hiddenEntities}
                      onReady={this.onPvjsReady} />
            </div>
        )
    }
}

Diagram.propTypes = {
    wpId: PropTypes.number.isRequired,
    version: PropTypes.number.isRequired,
    showPanZoomControls: PropTypes.bool.isRequired,
    onReady: PropTypes.func,
    slide: PropTypes.object.isRequired,
    isHidden: PropTypes.bool
};

Diagram.defaultProps = {
    hidden: false
};

export default Diagram;