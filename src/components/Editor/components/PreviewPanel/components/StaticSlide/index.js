import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { Pvjs } from '@wikipathways/pvjs';

const StaticSlide = (props) => {
    const { slide, wpId, version } = props;

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
        <div className="static-slide">
            <Pvjs about={`http://identifiers.org/wikipathways/WP${wpId}`}
                  version={version}
                  showPanZoomControls={false}
                  highlightedEntities={highlightedEntities}
                  pannedEntities={pannedEntities}
                  zoomedEntities={zoomedEntities}
                  hiddenEntities={hiddenEntities}
            />
        </div>
    )
};

StaticSlide.propTypes = {
    slide: PropTypes.object.isRequired,
    wpId: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired
};

export default StaticSlide;