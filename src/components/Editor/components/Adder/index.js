import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { cloneDeep } from 'lodash';
import './index.css';

class Adder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wpId: null,
        }
    }

    handleWpIdChange = e => {
        this.setState({
            wpId: e.target.value,
        })
    };

    handleTitleChange = e => {
        this.setState({
            title: e.target.value,
        })
    };

    handleVersionChange = e => {
        this.setState({
            version: parseInt(e.target.value, 10),
        })
    };

    handleSubmit = () => {
      const { handleSubmit } = this.props;
      handleSubmit(cloneDeep(this.state));
    };

    render() {
        return (
            <div className="adder-wrapper">
                <Paper zDepth={1}>
                    <TextField hintText="Title" onChange={this.handleTitleChange} />
                    <Divider/>
                    <TextField hintText="WikiPathways ID" onChange={this.handleWpIdChange} />
                    <Divider/>
                    <TextField hintText="version" onChange={this.handleVersionChange} />
                    <Divider/>
                    <FlatButton label="Create" primary={true} onClick={this.handleSubmit} />
                </Paper>
            </div>
        )
    }
}

Adder.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default Adder;