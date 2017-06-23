import React from 'react';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css';

const EditorToolbar = (props) => {
    return (
        <Toolbar className="editor-toolbar">
            <ToolbarGroup>
                <ToolbarTitle text="Pathway Presenter"/>
            </ToolbarGroup>
            <ToolbarGroup>
                <RaisedButton onClick={props.handleSave}>Save</RaisedButton>
            </ToolbarGroup>
        </Toolbar>
    )
};

EditorToolbar.propTypes = {
    handleSave: PropTypes.func.isRequired,
};

export default EditorToolbar