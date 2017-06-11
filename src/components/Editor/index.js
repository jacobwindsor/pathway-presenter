import './index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from '../Viewer';

class Editor extends Component {
    render() {
        const { presId } = this.props;
        return (
            <Viewer presId={presId}/>
        )
    }
}

Editor.propTypes = {
    presId: PropTypes.string.isRequired
};

export default Editor;