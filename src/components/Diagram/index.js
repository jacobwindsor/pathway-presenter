import { Pvjs } from '@wikipathways/pvjs';
import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import AspectRatio from '../AspectRatio';

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
    onEntityClick,
    panZoomLocked,
    onPanZoomChange
  } = props;

  const getEntityIds = entities =>
    entities.map(singleEntity => singleEntity.entityId);

  const { panCoordinates, zoomLevel, targets } = slide;

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

  const hiddenEntities = getEntityIds(
    targets.filter(singleTarget => singleTarget.hidden)
  );

  return (
    <div className={`diagram-wrapper ${isHidden ? 'isHidden' : ''}`}>
      <Pvjs
        wpId={wpId}
        version={version}
        showPanZoomControls={showPanZoomControls}
        panZoomLocked={panZoomLocked}
        detailPanelEnabled={detailPanelEnabled}
        onEntityClick={onEntityClick}
        highlightedEntities={highlightedEntities}
        panCoordinates={panCoordinates}
        onPanZoomChange={onPanZoomChange}
        zoomLevel={zoomLevel}
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
  onEntityClick: PropTypes.func,
  panZoomLocked: PropTypes.bool,
  onPanZoomChange: PropTypes.func,
  zoomLevel: PropTypes.number,
  panCoordinates: PropTypes.object
};

Diagram.defaultProps = {
  hidden: false,
  detailPanelEnabled: true,
  panZoomLocked: false,
  zoomLevel: 1,
  panCoordinates: { x: 0, y: 0 }
};

export default AspectRatio(16, 9)(Diagram);
