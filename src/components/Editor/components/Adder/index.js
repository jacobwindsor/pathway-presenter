import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import presentations from '../../../../data/presentations';
import { cloneDeep } from 'lodash';
import LogoWhite from '../../../../assets/logo-white.svg';
import './index.css';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { Scrollbars } from 'react-custom-scrollbars';
import CircularProgress from 'material-ui/CircularProgress';
import waitAndCallWithChar from '../../../../utils/waitAndCallWithChar';

class Adder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wpId: '',
      dataSource: [],
      title: '',
      authorName: '',
      version: '',
      canSubmit: false,
      isDemoing: false
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

  handleDemoClick = () => {
    this.setState(
      {
        wpId: '',
        title: '',
        authorName: '',
        version: '',
        isDemoing: true
      },
      () => {
        const waitAndSetState = (string, stateParamName) =>
          waitAndCallWithChar(
            string,
            val =>
              this.setState(state => {
                return { [stateParamName]: `${state[stateParamName]}${val}` };
              }),
            50 // Wait for 50ms between each char
          );

        const fillData = {
          title: 'The TCA Cycle',
          authorName: 'Fill Bot 2000',
          wpId: 'WP78',
          version: '0'
        };

        waitAndSetState(fillData.title, 'title'); // 50 * 13 = 650ms
        waitAndSetState(fillData.authorName, 'authorName'); // 50 * 13 = 650 ms
        waitAndSetState(fillData.wpId, 'wpId'); // 50 * 4 = 200ms
        waitAndSetState(fillData.version, 'version'); // 50ms
        // Total fill time = 1550ms;
        // Add time for user to digest
        setTimeout(this.handleSubmit, 4000, fillData);
      }
    );
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
      <Scrollbars>
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
            <Paper id="alpha-notice">
              <h3>Alpha Version</h3>
              <p>
                The Pathway Presenter is currently in alpha stage. This means
                that any presentations you create will only be saved locally.
                You cannot share them and can only present via the browser used
                to create the presentation. This will be rectified for the beta
                version.
              </p>
            </Paper>
            <h3>Select an existing Pathway Presentation</h3>
            <p>
              <em>Find presentations that you already created</em>
            </p>
            <AutoComplete
              filter={AutoComplete.fuzzyFilter}
              maxSearchResults={5}
              fullWidth={true}
              openOnFocus={true}
              hintText={'Search by title'}
              dataSource={this.state.dataSource}
              onNewRequest={this.handleSelect}
            />
            <FlatButton
              label="Show me an example"
              id="form-demo-button"
              disabled={this.state.isDemoing}
              onTouchTap={this.handleDemoClick}
            />
            <Formsy.Form
              onValid={() => this.setState({ canSubmit: true })}
              onInvalid={() => this.setState({ canSubmit: false })}
              onValidSubmit={this.handleSubmit}
              onInvalidSubmit={() => null}
            >
              <h3 id="creator-form-title">Create a new Pathway Presentation</h3>
              <FormsyText
                name="title"
                required
                requiredError={errorMessages.title}
                hintText="The TCA Cycle"
                floatingLabelText="Title"
                fullWidth
                updateImmediately
                value={this.state.title}
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
                value={this.state.authorName}
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
                value={this.state.wpId}
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
                value={this.state.version}
              />
              <FlatButton
                label={
                  this.state.isDemoing
                    ? <CircularProgress size={20} thickness={2} />
                    : 'Submit'
                }
                primary={true}
                type="submit"
                fullWidth={true}
                className="create-button"
                disabled={!this.state.canSubmit || this.state.isDemoing}
              />
            </Formsy.Form>
          </div>
        </Paper>
      </Scrollbars>
    );
  }
}

Adder.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default Adder;
