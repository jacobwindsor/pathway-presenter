import { Pvjs } from '@wikipathways/pvjs';
import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

const Diagram = props => {
  const onPvjsReady = ({ entities, manipulator }) => {
    const { onReady } = props;
    if (onReady) onReady({ entities, manipulator });
  };

  const {
    wpId,
    version,
    showPanZoomControls,
    isHidden,
    slide,
    detailPanelEnabled,
    onEntityClick
  } = props;
  const targets = slide.targets;

  const getEntityIds = entities =>
    entities.map(singleEntity => singleEntity.entityId);

  const highlightedEntities = targets
    .filter(singleTarget => singleTarget.highlighted)
    .map(singleTarget =>
      Object.assign(
        {},
        {
          entityId: singleTarget.entityId,
          color: singleTarget.highlightedColor
        }
      )
    );
  const pannedEntities = getEntityIds(
    targets.filter(singleTarget => singleTarget.panned)
  );
  const zoomedEntities = getEntityIds(
    targets.filter(singleTarget => singleTarget.zoomed)
  );
  const hiddenEntities = getEntityIds(
    targets.filter(singleTarget => singleTarget.hidden)
  );

  return (
    <div className={`diagram-wrapper ${isHidden ? 'isHidden' : ''}`}>
      <Pvjs
        wpId={wpId}
        version={version}
        showPanZoomControls={showPanZoomControls}
        detailPanelEnabled={detailPanelEnabled}
        onEntityClick={onEntityClick}
        highlightedEntities={highlightedEntities}
        pannedEntities={pannedEntities}
        zoomedEntities={zoomedEntities}
        hiddenEntities={hiddenEntities}
        onReady={onPvjsReady}
      />
    </div>
  );
};

Diagram.propTypes = {
  wpId: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  showPanZoomControls: PropTypes.bool.isRequired,
  onReady: PropTypes.func,
  slide: PropTypes.shape({
    targets: PropTypes.array.isRequired
  }).isRequired,
  isHidden: PropTypes.bool,
  detailPanelEnabled: PropTypes.bool,
  onEntityClick: PropTypes.func
};

Diagram.defaultProps = {
  hidden: false,
  detailPanelEnabled: true
};

export default Diagram;
