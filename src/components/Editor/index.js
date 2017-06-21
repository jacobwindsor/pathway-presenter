import './index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Diagram from '../Diagram';
import presentations from '../../data/presentations';
import PreviewPanel from './components/PreviewPanel';
import EditorPanel from './components/EditorPanel';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { findIndex } from 'lodash';
const uuidV4 = require('uuid/v4');

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
                // Don't show title slide
                const slidesToShow = presentation.slides.filter(singleSlide => !singleSlide.isTitleSlide);
                const presToShow = Object.assign({}, presentation, {slides: slidesToShow});

                this.setState({
                    presentation: presToShow,
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
              selectedEntity: null,
          });
    };

    handleEntityClick = (entity) => {
        // For now we only allow entities with text (nodes)
        if (! entity.textContent ) return;
        this.setState({selectedEntity: entity})
    };

    handleSlideUpdate = (slide) => {
        this.setState(state => {
            let newSlides = state.presentation.slides.slice();
            const indexToChange = findIndex(newSlides, singleSlide => singleSlide.id === slide.id);
            newSlides[indexToChange] = slide;
            return {
                presentation: Object.assign({}, state.presentation, {
                    slides: newSlides
                }),
                selectedEntity: null,
            }
        })
    };

    onSlideAdd = () => {
        this.setState(state => {
            return {
                presentation: Object.assign({}, state.presentation, {
                    slides: state.presentation.slides.concat({
                        id: uuidV4(),
                        targets: [],
                        title: null
                    }),
                }),
                // Since added one slide, new index is the length
                activeSlideIndex: state.presentation.slides.length,
                selectedEntity: null,
            }
        })
    };

    render() {
        const { loading, error, presentation, activeSlideIndex, selectedEntity } = this.state;

        if(! presentation) return null;
        const slide = presentation.slides[activeSlideIndex];

        return (
            <MuiThemeProvider>
                <div className="editor-wrapper">
                    <EditorPanel
                        slide={slide}
                        activeEntity={selectedEntity}
                        onUpdate={this.handleSlideUpdate}
                    />
                    <div className="right-section">
                        <div className="diagram-comp-wrapper">
                            <Diagram
                                wpId={presentation.wpId}
                                version={presentation.version}
                                detailPanelEnabled={false}
                                onEntityClick={this.handleEntityClick}
                                slide={slide}
                                showPanZoomControls={true} />
                        </div>
                        <Divider/>
                        <PreviewPanel
                            slides={presentation.slides}
                            wpId={presentation.wpId}
                            version={presentation.version}
                            onClick={this.handlePreviewClick}
                        />
                        <FloatingActionButton className="add-slide-button" onTouchTap={this.onSlideAdd}>
                            <ContentAdd />
                        </FloatingActionButton>
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