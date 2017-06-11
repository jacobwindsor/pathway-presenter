import './index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from '../Viewer';
import presentations from '../../data/presentations';
import PreviewPanel from './components/PreviewPanel';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presentation: null,
            loading: true,
            activeSlideIndex: 0,
            error: null,
        };
    }

    componentDidMount() {
        const { presId } = this.props;
        presentations.get(presId)
            .then(presentation => {
                this.setState({
                    presentation,
                    loading: false,
                    activeSlideIndex: 0,
                })
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false,
                })
            })
    }

    render() {
        const { presId } = this.props;
        const { loading, error, presentation } = this.state;

        return (
            <div className="editor-wrapper">
                <Viewer presId={presId}/>
            </div>
        )
    }
}

Editor.propTypes = {
    presId: PropTypes.string.isRequired
};

export default Editor;