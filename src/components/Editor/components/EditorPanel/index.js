import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Drawer from 'material-ui/Drawer';

class EditorPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEntity: null,
        }
    }

    render() {
        const { selectedEntity } = this.state;
        const EmptyState = () => {
            if (selectedEntity) return null;
            return (
                <div className="empty-state">
                    <h1>Select an entity!</h1>
                    <p>Click on an entity in the diagram to start adding manipulations.</p>
                </div>
            )
        };

        return (
            <Drawer open={true} containerClassName="editor-panel-container" >
                <EmptyState/>
            </Drawer>
        )
    }
}

EditorPanel.propTypes = {

};

export default EditorPanel;

