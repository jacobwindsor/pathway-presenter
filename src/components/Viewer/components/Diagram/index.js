import { Pvjs } from '@wikipathways/pvjs';
import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { isMatch } from 'lodash';

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

        const entityIds = (targets) => targets.map(singleTarget => singleTarget.entityId);
        const toZoomTo = slide.targets.filter(singleTarget => singleTarget.zoomed);
        const toPanTo = slide.targets.filter(singleTarget => singleTarget.panned);
        manipulator.zoomOn(entityIds(toZoomTo));
        manipulator.panTo(entityIds(toPanTo));
    }

    onPvjsReady = (pvjsRef) => {
        const { onReady } = this.props;
        this.setState({manipulator: pvjsRef.manipulator});
        onReady();
    }

    render() {
        const { wpId, version, showPanZoomControls } = this.props;

        return (
            <div className="diagram-wrapper">
                <Pvjs about={`http://identifiers.org/wikipathways/WP${wpId}`}
                      version={version}
                      showPanZoomControls={showPanZoomControls}
                      onReady={this.onPvjsReady} />;
            </div>
        )
    }
}

Diagram.propTypes = {
    wpId: PropTypes.number.isRequired,
    version: PropTypes.number.isRequired,
    showPanZoomControls: PropTypes.bool.isRequired,
    onReady: PropTypes.func,
    slide: PropTypes.object.isRequired
};

export default Diagram;