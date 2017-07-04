import React, { Component } from 'react';
import presentations from '../../data/presentations';
import './index.css';
import Diagram from '../Diagram';
import Controls from './components/Controls';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import PropTypes from 'prop-types';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Title from '../Title';
import * as screenfull from 'screenfull';
import { cloneDeep } from 'lodash';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isFullScreen: false
    };
  }

  componentDidMount() {
    const { presId } = this.props;
    presentations
      .get(presId)
      .then(presentation => {
        this.addEventListeners();
        const copy = cloneDeep(presentation);
        this.setState({
          presentation: copy,
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
        });
      });
  }

  addEventListeners() {
    window.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 39:
          // right arrow
          this.nextSlide();
          break;
        case 37:
          // Left arrow
          this.prevSlide();
          break;
        default:
          break;
      }
    });
  }

  nextSlide = () => {
    const { activeSlideIndex, presentation } = this.state;
    if (activeSlideIndex === presentation.slides.length - 1) return;
    this.setState({
      activeSlideIndex: activeSlideIndex + 1
    });
  };

  prevSlide = () => {
    const { activeSlideIndex } = this.state;
    if (activeSlideIndex === 0) return;
    this.setState({
      activeSlideIndex: activeSlideIndex - 1
    });
  };

  onReady = () => {
    this.setState({ loading: false });
  };

  handleToggleFullScreen = () => {
    if (screenfull.enabled) {
      screenfull.toggle();
      screenfull.onchange(() => {
        this.setState({
          isFullScreen: screenfull.isFullscreen
        });
      });
    }
  };

  render() {
    const {
      loading,
      presentation,
      activeSlideIndex,
      error,
      isFullScreen
    } = this.state;

    if (error) {
      return <ErrorMessage message={error.message} />;
    }

    if (loading) return <Loading />;
    if (!presentation) return null;

    const activeSlide = presentation.slides[activeSlideIndex];

    return (
      <MuiThemeProvider>
        <div className="presentation-viewer">
          {activeSlide.title ? <Title title={activeSlide.title} /> : null}

          <Diagram
            wpId={presentation.wpId}
            detailPanelEnabled={false}
            version={presentation.version}
            slide={activeSlide}
            showPanZoomControls={false}
            onReady={this.onReady}
          />

          <Controls
            onBackward={this.prevSlide}
            onForward={this.nextSlide}
            handleToggleFullScreen={this.handleToggleFullScreen}
            isFullScreen={isFullScreen}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Viewer.propTypes = {
  presId: PropTypes.string.isRequired
};

export default Viewer;
