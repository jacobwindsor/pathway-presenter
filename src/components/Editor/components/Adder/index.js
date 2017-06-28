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

    handleWpIdChange = e => {
        this.setState({
            wpId: e.target.value,
        })
    };

    handleTitleChange = e => {
        this.setState({
            title: e.target.value,
        })
    };

    handleVersionChange = e => {
        this.setState({
            version: parseInt(e.target.value, 10),
        })
    };

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
                        Create interactive presentations from pathways on <a href="http://wikipathways.org" target="_blank">WikiPathways</a>.
                    </p>
                    <div className="logo-wrapper">
                        <img src={LogoWhite}  />
                    </div>
                </div>
                <div className="content">
                    <h3>Select a Pathway Presentation</h3>
                    <AutoComplete fullWidth={true}
                                  hintText={"Search by title"}
                                  dataSource={this.state.dataSource}
                                  onNewRequest={this.handleSelect} />
                    <h3>Create a Pathway Presentation</h3>
                    <TextField hintText="Title" onChange={this.handleTitleChange} fullWidth={true} />
                    <TextField hintText="WikiPathways ID" onChange={this.handleWpIdChange} fullWidth={true} />
                    <TextField hintText="Version" onChange={this.handleVersionChange} fullWidth={true} />
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