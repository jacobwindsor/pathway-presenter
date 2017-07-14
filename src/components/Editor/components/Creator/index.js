import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyState from './components/EmptyState';
import PreviewPanel from './components/PreviewPanel';
import EditorPanel from './components/EditorPanel';
import Paper from 'material-ui/Paper';
import Title from '../../../Title';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SettingsDialog from './components/SettingsDialog';
import Diagram from '../../../Diagram';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { cloneDeep, isEqual } from 'lodash';
import Toolbar from './components/Toolbar';
import './index.css';

class Creator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlideIndex: 0,
      selectedEntity: null,
      presentation: cloneDeep(props.presentation),
      settingsDialogOpen: false,
      hasSlideChanged: true,
      diagramLocked: false
    };

    window.onbeforeunload = this.beforeUnload;
  }

  beforeUnload = e => {
    if (!isEqual(this.props.presentation, this.state.presentation)) {
      const confirmationMessage =
        'Your presentation has unsaved changed! Are you sure you want to leave?';

      // Use both for cross browser
      // See: https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  };

  handlePreviewClick = slideIndex => {
    this.setState(state => {
      return {
        activeSlideIndex: slideIndex,
        selectedEntity: null,
        hasSlideChanged: state.activeSlideIndex !== slideIndex
      };
    });
  };

  handleEntityClick = entity => {
    // For now we only allow entities with text (nodes)
    if (!entity.textContent) return;
    this.setState({ selectedEntity: entity });
  };

  handleSingleSlideUpdate = slide => {
    const { activeSlideIndex } = this.state;
    this.setState(state => {
      let newSlides = state.presentation.slides.slice();
      newSlides[activeSlideIndex] = Object.assign(
        {},
        newSlides[activeSlideIndex],
        slide
      );
      return {
        presentation: Object.assign({}, state.presentation, {
          slides: newSlides
        }),
        selectedEntity: null,
        // This may seem counter-intuitive. The slide has changed because the in-state slide differs
        // from the in-props slide
        hasSlideChanged: true
      };
    });
  };

  handlePanZoomChanged = ({ x, y, zoomLevel }) => {
    this.setState(state => {
      const copy = cloneDeep(state.presentation);
      copy.slides[state.activeSlideIndex].panCoordinates = {
        x,
        y
      };
      copy.zoomLevel = zoomLevel;

      return {
        presentation: copy
      };
    });
  };

  onSlideAdd = () => {
    this.setState(state => {
      return {
        presentation: Object.assign({}, state.presentation, {
          slides: state.presentation.slides.concat({
            targets: [],
            title: null
          })
        }),
        // Since added one slide, new index is the length
        activeSlideIndex: state.presentation.slides.length,
        hasSlideChanged: true,
        selectedEntity: null
      };
    });
  };

  handleSlidesUpdate = ({ slides, newActiveIndex }) => {
    this.setState(state => {
      const copy = cloneDeep(state.presentation);
      copy.slides = slides;
      return {
        presentation: copy,
        selectedEntity: null,
        activeSlideIndex: newActiveIndex,
        hasSlideChanged: state.activeSlideIndex !== newActiveIndex
      };
    });
  };

  handleSave = () => {
    const { presentation } = this.state;
    const { handleSave } = this.props;
    handleSave(presentation);
  };

  handleSettingsClick = () => {
    this.setState({ settingsDialogOpen: true });
  };

  handleSettingsSave = ({ title, authorName, wpId, version }) => {
    const toUpdate = cloneDeep(this.state.presentation);
    const updated = Object.assign(toUpdate, {
      title,
      authorName,
      wpId,
      version
    });
    this.setState(
      {
        presentation: updated
      },
      this.handleSave
    );
  };

  handlePresentClick = () => {
    if (!isEqual(this.props.presentation, this.state.presentation)) {
      alert(
        'Unsaved changes! Save before presenting to present your latest changes.'
      );
      return;
    }
    const { presentation } = this.state;
    const href = `${window.location
      .href}?present=true&presId=${presentation.id}`;
    window.open(href, '_blank');
  };

  renderNonEmptyComps() {
    const {
      activeSlideIndex,
      selectedEntity,
      presentation,
      hasSlideChanged,
      diagramLocked
    } = this.state;
    if (presentation.slides.length < 1) return null;
    const slide = presentation.slides[activeSlideIndex];
    return (
      <span>
        <div className="left-section">
          <EditorPanel
            slide={slide}
            slideIndex={activeSlideIndex}
            activeEntity={selectedEntity}
            onUpdate={this.handleSingleSlideUpdate}
            hasSlideChanged={hasSlideChanged}
            handleCancelTarget={() => this.setState({ selectedEntity: null })}
            handleTargetChipClick={entity =>
              this.setState({ selectedEntity: entity })}
          />
        </div>
        <div className="right-section">
          <div className="previewer">
            <div className="slide-wrapper">
              <div className="slide">
                <Paper className="content" zDepth={2}>
                  {slide.title ? <Title title={slide.title} /> : null}
                  <Diagram
                    wpId={presentation.wpId}
                    version={presentation.version}
                    detailPanelEnabled={false}
                    onEntityClick={this.handleEntityClick}
                    onPanZoomChanged={this.handlePanZoomChanged}
                    panZoomLocked={diagramLocked}
                    slide={slide}
                    showPanZoomControls={true}
                  />
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
              handleUpdate={this.handleSlidesUpdate}
              width={'calc(100% - 10rem)'}
              height="100%"
              activeSlideIndex={activeSlideIndex}
            />
            <FloatingActionButton
              className="add-slide-button"
              onTouchTap={this.onSlideAdd}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Paper>
        </div>
      </span>
    );
  }

  render() {
    const { presentation, settingsDialogOpen } = this.state;
    const { handleDelete } = this.props;

    const EmptyComps = () => {
      if (presentation.slides.length > 0) return null;
      return <EmptyState handleClick={this.onSlideAdd} />;
    };

    return (
      <div className="creator-wrapper">
        <Toolbar
          authorName={presentation.authorName}
          title={presentation.title}
          handleSave={this.handleSave}
          handlePresentClick={this.handlePresentClick}
          handleSettingsClick={this.handleSettingsClick}
        />
        <SettingsDialog
          handleDelete={handleDelete}
          isOpen={settingsDialogOpen}
          handleClose={() => this.setState({ settingsDialogOpen: false })}
          handleSave={this.handleSettingsSave}
          version={presentation.version}
          wpId={presentation.wpId}
          authorName={presentation.authorName}
          title={presentation.title}
        />
        <EmptyComps />
        {this.renderNonEmptyComps()}
      </div>
    );
  }
}

Creator.propTypes = {
  presentation: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Creator;
