import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import StartFlag from '../../../../../../assets/start-flag.svg';
import './index.css';

const EmptyState = props => {
    const { handleClick } = props;
    return (
        <Paper className="empty-creator-state">
            <div className="clickable" onClick={handleClick}>
                <div className="content">
                    <img src={StartFlag} alt="Start flag" />
                    <h1>Get started</h1>
                    <h3><i>Click here to add a slide</i></h3>
                </div>
            </div>
        </Paper>
    )
};

EmptyState.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

export default EmptyState