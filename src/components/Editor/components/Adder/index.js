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
import Formsy from 'formsy-react';
import { FormsyText, FormsyAutoComplete } from 'formsy-material-ui/lib';

class Adder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wpId: '',
      dataSource: [],
      title: '',
      authorName: '',
      version: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;

    presentations
      .list()
      .then(res => {
        if (!this._isMounted) throw new Error('Not mounted');
        return res;
      })
      .then(res =>
        this.setState({
          dataSource: res.map(single => {
            return {
              text: single.title,
              value: single.id
            };
          })
        })
      )
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = data => {
    const { handleCreate } = this.props;
    const copy = cloneDeep(data);
    copy.version = copy.version ? parseInt(copy.version, 10) : 0;
    handleCreate(copy);
  };

  handleSelect = (chosenRequest, index) => {
    const { handleSelect } = this.props;
    const { dataSource } = this.state;
    if (index < 0) return;
    handleSelect(dataSource[index].value);
  };

  render() {
    const errorMessages = {
      select: 'Select a valid presentation',
      title: 'You must enter a valid title',
      authorName: 'You must enter your name(s)',
      wpId: 'You must provide the WikiPathways ID',
      version: 'You can only enter numeric values'
    };

    return (
      <Paper zDepth={1} className="adder-wrapper">
        <div className="header">
          <h1>Pathway Presenter</h1>
          <p>
            Create interactive presentations from pathways on{' '}
            <a
              href="http://wikipathways.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              WikiPathways
            </a>.
          </p>
          <div className="logo-wrapper">
            <img src={LogoWhite} alt="Logo" />
          </div>
        </div>
        <div className="content">
          <h3>Select a Pathway Presentation</h3>
          <AutoComplete
            filter={AutoComplete.fuzzyFilter}
            maxSearchResults={5}
            fullWidth={true}
            openOnFocus={true}
            hintText={'Search by title'}
            dataSource={this.state.dataSource}
            onNewRequest={this.handleSelect}
          />
          <Formsy.Form
            onValid={() => this.setState({ canSubmit: true })}
            onInvalid={() => this.setState({ canSubmit: false })}
            onValidSubmit={this.handleSubmit}
            onInvalidSubmit={() => null}
          >
            <h3 id="creator-form-title">Create a Pathway Presentation</h3>
            <FormsyText
              name="title"
              required
              requiredError={errorMessages.title}
              hintText="The TCA Cycle"
              floatingLabelText="Title"
              fullWidth
              updateImmediately
            />
            <FormsyText
              required
              name="authorName"
              requiredError={'You must fill this in'}
              validationError={errorMessages.authorName}
              hintText="Gregor Mendel, Frederick Sanger"
              floatingLabelText="Author Name(s)"
              fullWidth
              updateImmediately
            />
            <FormsyText
              name="wpId"
              required
              validationError={errorMessages.wpId}
              validationErrors={{
                beginsWithWP:
                  'The WikiPathways ID must begin with WP followed by a number'
              }}
              validations={{
                beginsWithWP: (values, value) => {
                  const beginning = value.slice(0, 2);
                  const end = value.slice(2);
                  return beginning === 'WP' && !isNaN(end);
                }
              }}
              hintText="WP78"
              floatingLabelText="WikiPathways ID"
              value={''}
              fullWidth
              updateImmediately
            />
            <FormsyText
              name="version"
              validations="isNumeric"
              validationError={errorMessages.version}
              hintText="Type '0' for latest"
              floatingLabelText="WikiPathways Version (optional)"
              fullWidth
              updateImmediately
            />
            <FlatButton
              label="Create"
              primary={true}
              type="submit"
              fullWidth={true}
              className="create-button"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </div>
      </Paper>
    );
  }
}

Adder.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default Adder;
