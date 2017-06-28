import React from 'react';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import Logo from '../../../../../../assets/logo-white.svg';
import RaisedButton from 'material-ui/RaisedButton';
import AVPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import './index.css';
import { truncate } from 'lodash';

const EditorToolbar = (props) => {
    return (
        <Toolbar className="editor-toolbar">
            <ToolbarGroup>
                <div className="logo-wrapper">
                    <img src={Logo} className="logo" />
                </div>
                <ToolbarTitle
                    text={<span><strong>{truncate(props.title)}</strong>, {truncate(props.authorName)}</span>}
                    className="title" />
            </ToolbarGroup>
            <ToolbarGroup>
                <FlatButton
                    className="action-button"
                    icon={<ActionSettings/>}
                    style={{color: 'white'}}
                    onClick={props.handleSettingsClick} />
                <RaisedButton
                    className="action-button"
                    icon={<AVPlayCircleFilled/>}
                    label="Present"
                    labelPosition="before"/>
                <RaisedButton
                    className="action-button"
                    onClick={props.handleSave}
                    label="Save" />
            </ToolbarGroup>
        </Toolbar>
    )
};

EditorToolbar.propTypes = {
    handleSave: PropTypes.func.isRequired,
    handleSettingsClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
};

export default EditorToolbar