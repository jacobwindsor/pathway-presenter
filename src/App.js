import React, { Component } from 'react';
import './App.css';
import Viewer from './components/Viewer';
import Editor from './components/Editor';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isViewerOpen: false,
      presId: null
    };
  }

  componentDidMount() {
    const parsedUrl = new URL(window.location.href);
    this.setState({
      isViewerOpen: !!parsedUrl.searchParams.get('present'),
      presId: parsedUrl.searchParams.get('presId')
    });
  }

  render() {
    const { isViewerOpen, presId } = this.state;
    return (
      <div className="wrapper">
        {isViewerOpen
          ? <div
              style={{
                backgroundColor: 'black',
                width: '100%',
                height: '100%'
              }}
            >
              {' '}<Viewer presId={presId} />{' '}
            </div>
          : <Editor />}
      </div>
    );
  }
}

export default App;
