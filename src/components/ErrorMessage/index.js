import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import error from '../../assets/error.svg';
import './index.css';

const ErrorMessage = props =>
  <MuiThemeProvider>
    <div className="error-wrapper">
      <Paper className="error-message">
        <img src={error} alt="Error exclamation mark" />
        <h1>Woops</h1>
        <h3>
          {props.message}
        </h3>
      </Paper>
    </div>
  </MuiThemeProvider>;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
