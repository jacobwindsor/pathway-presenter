import React, { Component } from 'react';
import './App.css';
import Viewer from './components/Viewer';
import Editor from './components/Editor';

class App extends Component {
  render() {
    return (
        <div>
          <h1>Editor component</h1>
          <Editor presId={'906e47f9-8a16-491c-80ac-0df2dd609260'}/>
          <h1>Viewer Component</h1>
          <Viewer presId={'906e47f9-8a16-491c-80ac-0df2dd609260'}/>
        </div>
    );
  }
}

export default App;
