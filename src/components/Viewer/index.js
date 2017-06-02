import React, { Component } from 'react';
import presentations from '../../data/presentations';
import './index.css';
import Diagram from './components/Diagram';
import Controls from './components/Controls';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import PropTypes from 'prop-types';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Title from './components/Title';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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

    nextSlide = () =>  {
        const { activeSlideIndex, presentation } = this.state;
        if (activeSlideIndex === presentation.slides.length - 1) return;
        this.setState({
            activeSlideIndex: activeSlideIndex + 1,
        })
    }

    prevSlide = () => {
        const { activeSlideIndex } = this.state;
        if (activeSlideIndex === 0) return;
        this.setState({
            activeSlideIndex: activeSlideIndex - 1,
        })
    }

    onReady = () => {
        this.setState({loading: false})
    }

    render() {
        const { loading, presentation, error, activeSlideIndex } = this.state;

        if (error)  {
            return <ErrorMessage message={error.message} />
        }

        const slideTitle = presentation ? presentation.slides[activeSlideIndex].title : null;

        return (
            <MuiThemeProvider>
                <div className="presentation-viewer">
                    { loading ? <Loading /> : null }
                    { slideTitle ? <Title title={slideTitle} /> : null }
                    {
                        presentation ?
                            <Diagram
                                wpId={presentation.wpId}
                                version={presentation.version}
                                slide={presentation.slides[activeSlideIndex]}
                                showPanZoomControls={true}
                                isHidden={loading}
                                onReady={this.onReady}  />:
                            null
                    }
                    <Controls onBackward={this.prevSlide} onForward={this.nextSlide} />
                </div>
            </MuiThemeProvider>
        );
    }
}

Viewer.propTypes = {
    presId: PropTypes.string.isRequired
};

export default Viewer;