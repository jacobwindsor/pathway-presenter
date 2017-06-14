import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Drawer from 'material-ui/Drawer';

class EditorPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { activeEntity } = this.props;
        const EmptyState = () => {
            if (activeEntity) return null;
            return (
                <div className="empty-state">
                    <h1>Select an entity!</h1>
                    <p>Click on an entity in the diagram to start adding manipulations.</p>
                </div>
            )
        };

        const Controls = () => {
            if (! activeEntity) return null;
            return (
                <div className="controls">
                    <p>Active entiyId is {activeEntity.id}</p>
                </div>
            )
        }
        return (
            <Drawer open={true} containerClassName="editor-panel-container" >
                <EmptyState/>
                <Controls/>
            </Drawer>
        )
    }
}

EditorPanel.propTypes = {
    activeEntity: PropTypes.object,
};

export default EditorPanel;

