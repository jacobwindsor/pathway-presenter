import React from 'react';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Logo from '../../../../../../assets/logo-white.svg';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css';

const EditorToolbar = (props) => {
    return (
        <Toolbar className="editor-toolbar">
            <ToolbarGroup>
                <div className="logo-wrapper">
                    <img src={Logo} className="logo" />
                </div>
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