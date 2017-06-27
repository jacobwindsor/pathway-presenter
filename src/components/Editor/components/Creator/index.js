import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewPanel from './components/PreviewPanel';
import EditorPanel from './components/EditorPanel';
import Paper from 'material-ui/Paper';
import Title from '../../../Title';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import Diagram from '../../../Diagram';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { findIndex, cloneDeep } from 'lodash';
import Toolbar from './components/Toolbar';
import './index.css'

class Creator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlideIndex: 0,
            selectedEntity: null,
            presentation: cloneDeep(props.presentation),
        }
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
        const { activeSlideIndex } = this.state;
        this.setState(state => {
            let newSlides = state.presentation.slides.slice();
            newSlides[activeSlideIndex] = slide;
            return {
                presentation: Object.assign({}, state.presentation, {
                    slides: newSlides
                }),
                selectedEntity: null,
            }
        })
    };

    handleSlideRemove = slideIndex => {
        this.setState(state => {
            const copy = cloneDeep(state.presentation);
            copy.slides.splice(slideIndex, 1);
            return {
                presentation: copy,
                selectedEntity: null
            }
        })
    };

    onSlideAdd = () => {
        this.setState(state => {
            return {
                presentation: Object.assign({}, state.presentation, {
                    slides: state.presentation.slides.concat({
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

    handleSave = () => {
        const { presentation } = this.state;
        const { handleSave } = this.props;
        handleSave(presentation);
    };

    render() {
        const { activeSlideIndex, selectedEntity, presentation } = this.state;
        const slide = presentation.slides[activeSlideIndex];

        return (
            <div className="creator-wrapper">
                <Toolbar handleSave={this.handleSave} />
                <div className="left-section">
                    <EditorPanel
                        slide={slide}
                        slideIndex={activeSlideIndex}
                        activeEntity={selectedEntity}
                        onUpdate={this.handleSlideUpdate}
                    />
                </div>
                <div className="right-section">
                    <div className="previewer">
                        <div className="slide-wrapper">
                            <div className="slide">
                                <Paper className="content" zDepth={2}>
                                    { slide.title ? <Title title={slide.title} /> : null }
                                    <Diagram
                                        wpId={presentation.wpId}
                                        version={presentation.version}
                                        detailPanelEnabled={false}
                                        onEntityClick={this.handleEntityClick}
                                        slide={slide}
                                        showPanZoomControls={true} />
                                </Paper>
                            </div>
                        </div>
                    </div>
                    <Paper className="footer">
                        <PreviewPanel
                            slides={presentation.slides}
                            wpId={presentation.wpId}
                            version={presentation.version}
                            onClick={this.handlePreviewClick}
                            handleSlideRemove={this.handleSlideRemove}
                            width={'calc(100% - 10rem)'}
                            height="100%"
                        />
                        <FloatingActionButton
                            className="add-slide-button"
                            onTouchTap={this.onSlideAdd}
                            tooltip="Add a new slide"
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                    </Paper>
                </div>
            </div>
        )
    }
}

Creator.propTypes = {
    presentation: PropTypes.object.isRequired,
    handleSave: PropTypes.func.isRequired,
};

export default Creator;