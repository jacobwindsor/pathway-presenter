import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Viewer from './components/Viewer';

class App extends Component {
  render() {
    return (
      <Viewer presId={'906e47f9-8a16-491c-80ac-0df2dd609260'}/>
    );
  }
}

export default App;
