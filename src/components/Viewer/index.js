import React, { Component } from 'react';
import presentations from '../../data/presentations';
import './index.css';
import { memoize } from 'lodash/fp';
import Diagram from './components/Diagram';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import PropTypes from 'prop-types';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const { presId } = this.props;
        presentations.get(presId)
            .then(presentation => {
                this.addEventListeners();

                // Loading is not done here
                // Must wait until the Pvjs diagram has loaded
                this.setState({
                    presentation,
                    activeSlideIndex: 0
                });
            })
            .catch(err => {
                this.setState({
                    error: {
                        message: err.message
                    },
                    loading: false
                })
            });
    }

    addEventListeners() {
        window.addEventListener('keydown', (e) => {
            switch(e.keyCode) {
                case 39:
                    // right arrow
                    this.nextSlide();
                    break;
                case 37:
                    // Left arrow
                    this.prevSlide()
            }
        })
    }

    nextSlide() {
        const { activeSlideIndex, presentation } = this.state;
        this.setState({
            activeSlideIndex: Math.min(activeSlideIndex + 1, presentation.slides.length -1)
        })
    }

    prevSlide() {
        const { activeSlideIndex } = this.state;
        this.setState({
            activeSlideIndex: Math.max(activeSlideIndex - 1, 0)
        })
    }

    onPvjsReady = (pvjsRef) => {
        this.setState({
            loading: false,
            manipulator: pvjsRef.manipulator
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { manipulator, presentation, activeSlideIndex } = this.state;
        const prevSlideIndex = prevState;

        if (! manipulator || !presentation) return;

        if (prevSlideIndex === activeSlideIndex) return;

        presentation.slides[activeSlideIndex].targets.forEach(singleTarget => {
            if (singleTarget.highlighted)
                manipulator.highlightOn(singleTarget.entityId, singleTarget.highlightedColor);
            else
                manipulator.highlightOff(singleTarget.entityId);
        })
    }

    render() {
        const { loading, presentation, error } = this.state;

        if (error)  {
            return <ErrorMessage message={error.message} />
        }

        return (
            <div className="presentation-viewer">
                { loading? <Loading /> : null }
                {
                    presentation ?
                        <Diagram
                            className={loading? 'hidden': null}
                            wpId={presentation.wpId}
                            version={presentation.version}
                            showPanZoomControls={false}
                            onReady={this.onPvjsReady}  /> :
                        null
                }
            </div>
        );
    }
}

Viewer.propTypes = {
    presId: PropTypes.string.isRequired
};

export default Viewer;