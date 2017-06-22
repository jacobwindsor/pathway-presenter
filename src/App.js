import React, { Component } from 'react';
import './App.css';
import Viewer from './components/Viewer';
import Editor from './components/Editor';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
        <div>
            <h1>Editor component</h1>
            <div className="editor-comp-wrapper">
                <Editor/>
            </div>
            {/*<h1>Viewer Component</h1>*/}
            {/*<div className="viewer-wrapper">*/}
                {/*<Viewer presId={'906e47f9-8a16-491c-80ac-0df2dd609260'}/>*/}
            {/*</div>*/}
        </div>
    );
  }
}

export default App;
