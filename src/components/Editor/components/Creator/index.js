import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewPanel from './components/PreviewPanel';
import EditorPanel from './components/EditorPanel';
import Title from '../../../Title';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import Diagram from '../../../Diagram';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { findIndex, cloneDeep } from 'lodash';
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
        const { activeSlideIndex, selectedEntity, presentation } = this.state;
        const slide = presentation.slides[activeSlideIndex];

        return (
            <div className="creator-wrapper">
                <EditorPanel
                    slide={slide}
                    activeEntity={selectedEntity}
                    onUpdate={this.handleSlideUpdate}
                />
                <div className="right-section">
                    <div className="diagram-comp-wrapper">
                        { slide.title ? <Title title={slide.title} /> : null }
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
        )
    }
}

Creator.propTypes = {
    presentation: PropTypes.object.isRequired,
};

export default Creator;