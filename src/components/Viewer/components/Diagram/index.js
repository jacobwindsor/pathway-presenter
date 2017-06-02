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

    componentDidUpdate(prevProps, prevState) {
        const { prevManipulator } = prevState;
        const { curManipulator } = this.state;
        const { prevSlide } = prevProps;
        const { curSlide } = this.props;
        if (isMatch(prevSlide, curSlide)
            && (!prevManipulator && curManipulator)) return;
        this.performManipulations();
    }

    performManipulations() {
        const { slide } = this.props;
        const { manipulator } = this.state;
        if (! manipulator || ! slide ) return;
        const getEntityIds = (targets) => targets.map(singleTarget => singleTarget.entityId);

        // Find the entities that are not included in the slide and reset them
        const diagramEntityIds = manipulator.getEntities().map(singleEntity => singleEntity.id);
        difference(diagramEntityIds, getEntityIds(slide.targets)).forEach(singleId => {
            manipulator.highlightOff(singleId);
            manipulator.show(singleId);
        });

        // Now perform the manipulations on the targets
        slide.targets.forEach(singleTarget => {
            if (singleTarget.highlighted)
                manipulator.highlightOn(singleTarget.entityId, singleTarget.highlightedColor);
            else
                manipulator.highlightOff(singleTarget.entityId);
            if (singleTarget.hidden)
                manipulator.hide(singleTarget.entityId);
            else
                manipulator.show(singleTarget.entityId);
        });

        const toZoomTo = slide.targets.filter(singleTarget => singleTarget.zoomed);
        const toPanTo = slide.targets.filter(singleTarget => singleTarget.panned && ! singleTarget.zoomed);
        if (toZoomTo.length > 0)
            manipulator.zoomOn(getEntityIds(toZoomTo));
        if (toPanTo.length > 0) {
            manipulator.resetZoom();
            manipulator.panTo(getEntityIds(toPanTo));
        }
    }

    onPvjsReady = (pvjsRef) => {
        const { onReady } = this.props;
        this.setState({manipulator: pvjsRef.manipulator});
        onReady();
    }

    render() {
        const { wpId, version, showPanZoomControls, isHidden } = this.props;

        return (
            <div className={`diagram-wrapper ${isHidden? 'isHidden' : ''}`}>
                <Pvjs about={`http://identifiers.org/wikipathways/WP${wpId}`}
                      version={version}
                      showPanZoomControls={showPanZoomControls}
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