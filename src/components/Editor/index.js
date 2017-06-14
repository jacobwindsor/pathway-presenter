import './index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Diagram from '../Diagram';
import presentations from '../../data/presentations';
import PreviewPanel from './components/PreviewPanel';
import EditorPanel from './components/EditorPanel';
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
            selectedEntity: null,
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

    handlePreviewClick = (slideNumber) => {
          this.setState({
              // slideNumber is not a 0th index
              activeSlideIndex: slideNumber - 1,
          });
    };

    handleEntityClick = (entity) => {
        // For now we only allow entities with text (nodes)
        if (! entity.textContent ) return;
        this.setState({selectedEntity: entity})
    };

    render() {
        const { loading, error, presentation, activeSlideIndex, selectedEntity } = this.state;

        if(! presentation) return null;
        // Don't show the title slide
        const slides = presentation.slides.filter(singleSlide => !singleSlide.isTitleSlide);
        const slide = slides[activeSlideIndex];

        return (
            <MuiThemeProvider>
                <div className="editor-wrapper">
                    <EditorPanel
                        activeEntity={selectedEntity}
                    />
                    <div className="right-section">
                        <Diagram
                            wpId={presentation.wpId}
                            version={presentation.version}
                            detailPanelEnabled={false}
                            onEntityClick={this.handleEntityClick}
                            slide={slide}
                            showPanZoomControls={true} />
                        <Divider/>
                        <PreviewPanel
                            slides={slides}
                            wpId={presentation.wpId}
                            version={presentation.version}
                            onClick={this.handlePreviewClick}
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

Editor.propTypes = {
    presId: PropTypes.string.isRequired
};

export default Editor;