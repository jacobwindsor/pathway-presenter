import './index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import presentations from '../../data/presentations';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Adder from './components/Adder';
import Creator from './components/Creator';
import ErrorMessage from '../ErrorMessage';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presentation: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        const { presId } = this.props;
        if (! presId) return;
        presentations.get(presId)
            .then(presentation => {
                // Don't show title slide
                const slidesToShow = presentation.slides.filter(singleSlide => !singleSlide.isTitleSlide);
                const presToShow = Object.assign({}, presentation, {slides: slidesToShow});

                this.setState({
                    presentation: presToShow,
                    loading: false,
                })
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false,
                })
            })
    }

    savePresentation = presentation => {
        let promise;
        if(presentation.id) {
            promise = presentations.update(presentation.id, presentation)
        }
        else {
            promise = presentations.create(presentation);
        }

        promise
            .then(presentation => this.setState({presentation}))
            .catch(error => {
                this.setState({
                    error
                })
            })
    };

    handlePathwaySelect = (toCreate) => {
        this.setState({
            presentation: {
                wpId: toCreate.wpId,
                version: toCreate.version || 0,
                title: toCreate.title || null,
                description: toCreate.description || null,
                slides: [{
                    targets: [],
                }],
            }
        })
    };

    render() {
        const { loading, error, presentation } = this.state;

        const SuccessContent = () => {
            if (error) return null;
            return (
                <div className="full editor-wrapper">
                    { presentation ?
                        <Creator presentation={presentation} handleSave={this.savePresentation} /> :
                        <Adder handleSubmit={this.handlePathwaySelect}/>
                    }
                </div>
            )
        };

        const ErrorContent = () => {
            if (! error) return null;
            return <ErrorMessage message={error.message} />
        };

        return (
            <MuiThemeProvider>
                <div className="full">
                    <ErrorContent />
                    <SuccessContent />
                </div>
            </MuiThemeProvider>
        )
    }
}

Editor.propTypes = {
    presId: PropTypes.string,
};

export default Editor;