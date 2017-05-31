import React, { Component } from 'react';
import Slide from './Slide';
import { Pvjs } from '@wikipathways/pvjs';
import presentations from '../../data/presentations';
import './index.css';
import { memoize } from 'lodash/fp';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        presentations.get('906e47f9-8a16-491c-80ac-0df2dd609260')
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
            return <p>Error occurred: {error.message}</p>
        }

        if (! presentation ) {
            return <p>Fetching presentation data...</p>
        }

        // Render Pvjs on top of the slides. This is a bit of a hack
        // TODO: Consider pre-rendering the Pvjs component and passing the HTML to the Slide
        // Each slide then has full control over the diagram
        // Memoize may be helpful in doing this
        const diagram = <Pvjs about={`http://identifiers.org/wikipathways/WP${presentation.wpId}`}
                              version={presentation.version}
                              showPanZoomControls={false}
                              onReady={this.onPvjsReady} />;

        const diagramWrapperStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            zIndex: '9999'
        };

        return (
            <div>
                <div style={diagramWrapperStyles}>
                    {diagram}
                </div>
            </div>
        );
    }
}