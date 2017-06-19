import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDone from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import { find, sortBy, isEqual } from 'lodash';
import Subheader from 'material-ui/Subheader';

class EditorPanel extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState(props);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.slide.id !== nextProps.slide.id) {
            // Slide id not the same. Probably a new slide has been given
            this.setState(this.getInitialState(nextProps));
            return;
        }

        const { activeEntity, slide } = nextProps;
        if(! isEqual(this.props.activeEntity, activeEntity)) {
            const activeTarget = slide.targets.find(singleTarget => singleTarget.entityId === activeEntity.id);
            if (! activeTarget) {
                this.setState({
                    isHighlighted: false,
                    isPanned: false,
                    isHidden: false,
                    isZoomed: false,
                    highlightedColor: null,
                })
            }
            else {
                this.setState({
                    isHighlighted: activeTarget.highlighted,
                    isPanned: activeTarget.panned,
                    isHidden: activeTarget.hidden,
                    isZoomed: activeTarget.zoomed,
                    highlightedColor: activeTarget.highlightedColor,
                })
            }
        }
    }

    getInitialState(props) {
        return {
            isHighlighted: false,
            isPanned: false,
            isHidden: false,
            isZoomed: false,
            highlightedColor: null,
            targets: props.slide.targets || [],
            title: props.slide.title,
            id: props.slide.id,
            isDuplicate: false
        }
    }

    handleHighlightToggle = () => {
        this.setState((state) => {
            return {
                isHighlighted: !state.isHighlighted
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
            // Filter out the new target and add it again
            // Allows for editing of already added targets
            const newTargets = state.targets.filter(singleTarget => singleTarget.entityId !== props.activeEntity.id);
            return {
                targets: newTargets.concat([{
                    entityId: props.activeEntity.id,
                    textContent: props.activeEntity.textContent,
                    hidden: state.isHidden,
                    zoomed: state.isZoomed,
                    panned: state.isPanned,
                    highlighted: state.isHighlighted,
                    highlightedColor: state.highlightedColor,
                }]),
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

    handleSnackbarRequestClose = () => {
        this.setState({
            isDuplicate: false,
        })
    };

    componentDidUpdate(prevProps, prevState) {
        const sort = (arr) => sortBy(arr, 'entityId');
        const prevTargets = prevState.targets;
        const curTargets = this.state.targets;
        const prevTitle = prevState.title;
        const curTitle = this.state.title;
        const { onUpdate } = this.props;
        if (! onUpdate) return;
        if (!isEqual(sort(prevTargets), sort(curTargets)) || prevTitle !== curTitle) {
            onUpdate({
                id: this.state.id,
                title: curTitle,
                targets: curTargets,
            });
        }
    }

    render() {
        const { activeEntity } = this.props;
        const { targets } = this.state;

        const TargetEmptyState = () => {
            if (activeEntity) return null;
            return (
                <div className="empty-state">
                    <h1>Select an entity!</h1>
                    <p>Click on an entity in the diagram to start adding manipulations.</p>
                </div>
            )
        };

        const TargetControls = () => {
            if (! activeEntity) return null;

            return (
                <div className="controls">
                    <List>
                        <Subheader>{activeEntity.textContent}</Subheader>
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
                                      toggled={this.state.isHighlighted} />}
                                  open={this.state.isHighlighted}
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
                    <IconButton className="add-target-button" onClick={this.handleAdd}>
                        <ActionDone/>
                    </IconButton>
                    <Snackbar
                        open={this.state.isDuplicate}
                        message="No duplicate entities!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleSnackbarRequestClose}
                    />
                </div>
            )
        };

        const TargetChips = () => {
            const chips = targets.map((singleTarget,i) => <Chip
                key={i}
                className="target-chip"
                onRequestDelete={() => this.handleRequestChipDelete(singleTarget.entityId)}>
                {singleTarget.textContent}
            </Chip>);

            if (chips.length < 1) return null;
            return (
                <div className="chip-wrapper">
                    {chips}
                </div>
            )
        }

        return (
            <Drawer open={true} containerClassName="editor-panel-container" >
                <TextField hintText="Slide title" fullWidth={true} className="title-input"/>
                <TargetEmptyState/>
                <TargetControls/>
                <TargetChips/>
            </Drawer>
        )
    }
}

EditorPanel.propTypes = {
    activeEntity: PropTypes.object,
    onUpdate: PropTypes.func,
    slide: PropTypes.object.isRequired,
};

export default EditorPanel;

