import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { red500 } from 'material-ui/styles/colors';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';

class SettingsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title || '',
      authorName: props.authorName || '',
      wpId: props.wpId,
      version: props.version,
      deleteConfirmDialogOpen: false
    };
  }

  handleChange = targetName => e =>
    this.setState({ [targetName]: e.target.value });
  handleTitleChange = this.handleChange('title');
  handleAuthorNameChange = this.handleChange('authorName');
  handleWpIdChange = this.handleChange('wpId');
  handleVersionChange = this.handleChange('version');

  render() {
    const { handleClose, handleSave, isOpen, handleDelete } = this.props;
    const { title, authorName, wpId, version } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        id="settings-cancel-button"
        onTouchTap={handleClose}
      />,
      <FlatButton
        id="settings-save-button"
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          handleSave(this.state);
          handleClose();
        }}
      />
    ];

    return (
      <Dialog
        title="Settings"
        actions={actions}
        open={isOpen}
        onRequestClose={handleClose}
        autoScrollBodyContent={true}
        modal={false}
      >
        <DeleteConfirmDialog
          handleDelete={handleDelete}
          handleClose={() => this.setState({ deleteConfirmDialogOpen: false })}
          isOpen={this.state.deleteConfirmDialogOpen}
        />
        <TextField
          hintText="The TCA Cycle"
          floatingLabelText="Title"
          onChange={this.handleTitleChange}
          value={title}
          fullWidth={true}
        />
        <TextField
          hintText="Gregor Mendel, Frederick Sanger"
          floatingLabelText="Author Name(s)"
          onChange={this.handleAuthorNameChange}
          value={authorName}
          fullWidth={true}
        />
        <TextField
          hintText="WP78"
          floatingLabelText="WikiPathways ID"
          onChange={this.handleWpIdChange}
          value={wpId}
          fullWidth={true}
        />
        <TextField
          hintText="Type '0' for latest"
          floatingLabelText="WikiPathways Version"
          onChange={this.handleVersionChange}
          value={version}
          fullWidth={true}
        />
        <RaisedButton
          label="Delete"
          fullWidth={true}
          backgroundColor={red500}
          labelColor={'#ffffff'}
          onTouchTap={() => this.setState({ deleteConfirmDialogOpen: true })}
        />
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  title: PropTypes.string,
  authorName: PropTypes.string,
  version: PropTypes.number.isRequired,
  wpId: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default SettingsDialog;
