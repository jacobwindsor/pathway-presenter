import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Diagram from '../../../../../Diagram';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import Aspectral from 'react-aspectral';
import Title from '../../../../../Title';
import './index.css';

const Slide = props => {
  const {
    slide,
    wpId,
    version,
    handleEntityClick,
    diagramLocked,
    handlePanZoomChanged,
    handleLock,
    handleUnlock
  } = props;
  return (
    <Paper className="slide" zDepth={2}>
      {slide.title ? <Title title={slide.title} /> : null}
      <Diagram
        wpId={wpId}
        version={version}
        detailPanelEnabled={false}
        onEntityClick={handleEntityClick}
        onPanZoomChange={handlePanZoomChanged}
        panZoomLocked={diagramLocked}
        zoomLevel={slide.zoomLevel}
        panCoordinates={slide.panCoordinates}
        slide={slide}
        showPanZoomControls={true}
      />
      <div className="lock-wrapper">
        {diagramLocked
          ? <Lock onTouchTap={handleUnlock} />
          : <LockOpen onTouchTap={handleLock} />}
      </div>
    </Paper>
  );
};

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  wpId: PropTypes.string.isRequired,
  version: PropTypes.number,
  handleEntityClick: PropTypes.func.isRequired,
  diagramLocked: PropTypes.bool.isRequired,
  handlePanZoomChanged: PropTypes.func.isRequired,
  handleLock: PropTypes.func.isRequired,
  handleUnlock: PropTypes.func.isRequired
};

Slide.defaultProps = {
  version: 0
};

export default Aspectral(16, 9)(Slide);
