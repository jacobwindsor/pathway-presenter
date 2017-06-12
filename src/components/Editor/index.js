import './index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Diagram from '../Diagram';
import presentations from '../../data/presentations';
import PreviewPanel from './components/PreviewPanel';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presentation: null,
            loading: true,
            activeSlideIndex: 0,
            error: null,
        };
    }

    componentDidMount() {
        const { presId } = this.props;
        presentations.get(presId)
            .then(presentation => {
                this.setState({
                    presentation,
                    loading: false,
                    activeSlideIndex: 0,
                })
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false,
                })
            })
    }

    render() {
        const { loading, error, presentation, activeSlideIndex } = this.state;

        if(! presentation) return null;
        // Don't show the title slide
        const slides = presentation.slides.filter(singleSlide => !singleSlide.isTitleSlide);
        const slide = slides[activeSlideIndex];

        return (
            <MuiThemeProvider>
                <div className="editor-wrapper">
                    <Diagram
                        wpId={presentation.wpId}
                        version={presentation.version}
                        slide={slide}
                        showPanZoomControls={true} />
                    <Divider/>
                    <PreviewPanel slides={slides}
                                  wpId={presentation.wpId}
                                  version={presentation.version} />
                </div>
            </MuiThemeProvider>
        )
    }
}

Editor.propTypes = {
    presId: PropTypes.string.isRequired
};

export default Editor;