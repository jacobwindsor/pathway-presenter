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
import TitleSlide from './components/TitleSlide';

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
                this.setState({
                    presentation,
                    loading: false,
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
        const { loading, presentation, activeSlideIndex, error } = this.state;

        if (error)  {
            return <ErrorMessage message={error.message} />
        }

        if ( loading ) return  <Loading />;
        if (! presentation) return null;

        const activeSlide = presentation.slides[activeSlideIndex];
        const diagramSlide = activeSlide.isTitleSlide ? presentation.slides[activeSlideIndex + 1] : activeSlide;

        const isHidden = activeSlide.isTitleSlide;

        return (
            <MuiThemeProvider>
                <div className="presentation-viewer">
                    { activeSlide.isTitleSlide ? <TitleSlide title={presentation.title} authorName={presentation.authorName} />
                        : null }

                    { !activeSlide.isTitleSlide && activeSlide.title ? <Title title={activeSlide.title} /> : null }

                    <Diagram
                        wpId={presentation.wpId}
                        version={presentation.version}
                        slide={diagramSlide}
                        showPanZoomControls={false}
                        isHidden={isHidden}
                        onReady={this.onReady}  />

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