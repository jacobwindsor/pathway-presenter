import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const DeleteConfirmDialog = props => {
    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={props.handleClose}
        />,
        <FlatButton
            label="Delete"
            primary={true}
            keyboardFocused={true}
            onTouchTap={() => { props.handleDelete(); props.handleClose(); }}
        />,
    ];

    return (
        <Dialog
            title="Delete Presentation"
            actions={actions}
            modal={false}
            onRequestClose={props.handleClose}
            open={props.isOpen}
        >
            Are you sure you want to delete this presentation?
        </Dialog>
    )
};

DeleteConfirmDialog.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default DeleteConfirmDialog;