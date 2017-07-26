import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';

export default (relWidth, relHeight) => {
  return WrappedComponent => {
    return class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          canShow: false,
          width: '100%',
          height: '100%'
        };
      }

      componentDidMount() {
        this.computeDimensions(
          this.container.offsetWidth,
          this.container.offsetHeight
        );
      }

      computeDimensions = () => {
        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;
        let computedWidth;
        let computedHeight;

        // Width !> containerWidth
        // height !> containerHeight
        // Width used primarily for aspect ratio
        // Unless computedHeight exceeds container height

        computedWidth = containerWidth;
        computedHeight = containerWidth / relWidth * relHeight;
        if (computedHeight > containerHeight) {
          computedHeight = containerHeight;
          computedWidth = containerHeight / relHeight * relWidth;
        }

        this.setState({
          width: computedWidth,
          height: computedHeight,
          canShow: true
        });
      };

      render() {
        const { width, height, canShow } = this.state;

        const wrapperStyles = {
          width,
          height,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };

        return (
          <div
            ref={container => (this.container = container)}
            style={{ opacity: canShow ? 1 : 0, width: '100%', height: '100%' }}
          >
            <ReactResizeDetector
              handleWidth
              handleHeight
              onResize={this.computeDimensions}
            />
            <div style={wrapperStyles}>
              <WrappedComponent {...this.props} />
            </div>
          </div>
        );
      }
    };
  };
};
