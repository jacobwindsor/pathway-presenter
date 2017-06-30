import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import presentations from '../../../../data/presentations';
import { cloneDeep } from 'lodash';
import LogoWhite from '../../../../assets/logo-white.svg';
import './index.css';

class Adder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wpId: null,
            dataSource: [],
        }
    }

    componentDidMount() {
        presentations.list()
            .then(res=> this.setState({
                dataSource: res.map(single => {
                    return {
                        text: single.title,
                        value: single.id
                    }
                })
            }))
    }

    handleChange = targetName => e => this.setState({ [targetName]: e.target.value });
    handleTitleChange = this.handleChange('title');
    handleAuthorNameChange = this.handleChange('authorName');
    handleWpIdChange = this.handleChange('wpId');
    handleVersionChange = this.handleChange('version');

    handleSubmit = () => {
      const { handleCreate } = this.props;
      handleCreate(cloneDeep(this.state));
    };

    handleSelect = (chosenRequest, index) => {
        const { handleSelect } = this.props;
        const { dataSource } = this.state;
        if(index < 0) return;
        handleSelect(dataSource[index].value)
    };

    render() {
        return (
            <Paper zDepth={1} className="adder-wrapper">
                <div className="header">
                    <h1>Pathway Presenter</h1>
                    <p>
                        Create interactive presentations from pathways on <a href="http://wikipathways.org" target="_blank" rel="noopener noreferrer">WikiPathways</a>.
                    </p>
                    <div className="logo-wrapper">
                        <img src={LogoWhite} alt="Logo"  />
                    </div>
                </div>
                <div className="content">
                    <h3>Select a Pathway Presentation</h3>
                    <AutoComplete
                        filter={AutoComplete.fuzzyFilter}
                        maxSearchResults={5}
                        fullWidth={true}
                        openOnFocus={true}
                        hintText={"Search by title"}
                        dataSource={this.state.dataSource}
                        onNewRequest={this.handleSelect} />
                    <h3>Create a Pathway Presentation</h3>
                    <TextField
                        hintText="The TCA Cycle"
                        floatingLabelText="Title"
                        onChange={this.handleTitleChange}
                        value={this.state.title}
                        fullWidth={true}/>
                    <TextField
                        hintText="Gregor Mendel, Frederick Sanger"
                        floatingLabelText="Author Name(s)"
                        onChange={this.handleAuthorNameChange}
                        value={this.state.authorName}
                        fullWidth={true}/>
                    <TextField
                        hintText="WP78"
                        floatingLabelText="WikiPathways ID"
                        onChange={this.handleWpIdChange}
                        value={this.state.wpId}
                        fullWidth={true} />
                    <TextField
                        hintText="Type '0' for latest"
                        floatingLabelText="WikiPathways Version"
                        onChange={this.handleVersionChange}
                        value={this.state.version}
                        fullWidth={true} />
                    <FlatButton label="Create" primary={true} onClick={this.handleSubmit} fullWidth={true}
                                className="create-button"/>
                </div>
            </Paper>
        )
    }
}

Adder.propTypes = {
    handleCreate: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
};

export default Adder;