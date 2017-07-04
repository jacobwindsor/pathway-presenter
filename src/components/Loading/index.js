import React from 'react';
import Spinner from 'react-spinkit';
import './index.css';

export default () =>
  <Spinner
    name="three-bounce"
    color="steelblue"
    fadeIn="quarter"
    className="loading-spinner"
  />;
