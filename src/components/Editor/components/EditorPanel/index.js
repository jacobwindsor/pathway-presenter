import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

class EditorPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorPickerOpen: false,
            isPanned: false,
            isZoomed: false,
            isHidden: false,
            highlightedColor: null,
            targets: [],
        }
    }

    handleHighlightToggle = () => {
        this.setState((state) => {
            return {
                colorPickerOpen: !state.colorPickerOpen
            }
        });
    };

    handleZoomToggle = () => {
        this.setState(state => {
            return {
                isZoomed: !state.isZoomed,
            }
        })
    };

    handlePanToggle = () => {
        this.setState(state => {
            return {
                isPanned: !state.isPanned,
            }
        })
    };

    handleHiddenToggle = () => {
        this.setState(state => {
            return {
                isHidden: !state.isHidden,
            }
        })
    };

    handleColorChange = (e, value) => {
        this.setState({
            highlightedColor: value
        })
    };

    handleAdd = () => {
        this.setState((state, props) => {
            return {
                targets: state.targets.concat([{
                    entityId: props.activeEntity.id,
                    textContent: props.activeEntity.textContent,
                    hidden: state.isHidden,
                    zoomed: state.isZoomed,
                    panned: state.isPanned,
                    highlighted: !!state.highlightedColor,
                    highlightedColor: state.highlightedColor,
                }])
            }
        });
    };

    handleRequestChipDelete = (entityId) => {
        this.setState(state => {
            return {
                targets: state.targets.filter(singleTarget => singleTarget.entityId !== entityId),
            }
        })
    };

    render() {
        const { activeEntity } = this.props;
        const { targets } = this.state;

        const EmptyState = () => {
            if (activeEntity) return null;
            return (
                <div className="empty-state">
                    <h1>Select an entity!</h1>
                    <p>Click on an entity in the diagram to start adding manipulations.</p>
                </div>
            )
        };

        const chips = () => targets.map((singleTarget,i) => <Chip
            key={i}
            className="target-chip"
            onRequestDelete={() => this.handleRequestChipDelete(singleTarget.entityId)}>
                {singleTarget.textContent}
            </Chip>);

        const Controls = () => {
            if (! activeEntity) return null;
            return (
                <div className="controls">
                    <List>
                        <h1>{activeEntity.textContent}</h1>
                        <ListItem primaryText="Zoom" rightToggle={<Toggle
                            onToggle={this.handleZoomToggle}
                            toggled={this.state.isZoomed} />} />
                        <Divider/>
                        <ListItem primaryText="Pan" rightToggle={<Toggle
                            onToggle={this.handlePanToggle}
                            toggled={this.state.isPanned} />}/>
                        <Divider/>
                        <ListItem primaryText="Hide" rightToggle={<Toggle
                            onToggle={this.handleHiddenToggle}
                            toggled={this.state.isHidden} />} />
                        <Divider/>
                        <ListItem primaryText="Highlight"
                                  rightToggle={<Toggle
                                      onToggle={this.handleHighlightToggle}
                                      toggled={this.state.colorPickerOpen} />}
                                  open={this.state.colorPickerOpen}
                                  nestedItems={[
                                      <RadioButtonGroup
                                          name="highlightColor"
                                          defaultSelected="red"
                                          className="color-options"
                                          onChange={this.handleColorChange}
                                          valueSelected={this.state.highlightedColor}
                                          key={1} >
                                          <RadioButton value="red" label="Red" className="color-choice" key={1}/>
                                          <RadioButton value="green" label="Green" className="color-choice" key={2}/>
                                          <RadioButton value="blue" label="Blue" className="color-choice" key={3}/>
                                          <RadioButton value="yellow" label="Yellow" className="color-choice" key={4}/>
                                      </RadioButtonGroup>
                                  ]} />
                        <Divider/>
                    </List>
                    <IconButton className="add-button" onClick={this.handleAdd}>
                        <ContentAdd/>
                    </IconButton>
                    <div className="chip-wrapper">
                        {chips()}
                    </div>
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

