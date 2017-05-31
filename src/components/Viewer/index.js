import React, { Component } from 'react';
import {
    Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
    Heading, Image, Layout, ListItem, List, Quote, Slide, Text
} from 'spectacle';
import { Pvjs } from '@wikipathways/pvjs';
import presentations from '../../data/presentations';
import './index.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        presentations.get('906e47f9-8a16-491c-80ac-0df2dd609260')
            .then(presentation => {
                this.setState({ presentation, loading: false })
            })
            .catch(err => {
                this.setState({
                    error: {
                        message: err.message
                    },
                    loading: false
                })
            });
    }

    render() {
        const { loading, presentation, error } = this.state;

        if ( loading ) {
            return <p>Loading</p>
        }

        if (error)  {
            return <p>Error occurred: {error}</p>
        }


        const slideStyle = {
            height: '100%'
        };

        return (
            <Deck>
                <Slide style={slideStyle}>
                    <Pvjs about={`http://identifiers.org/wikipathways/WP${presentation.wpId}`}version="0" showPanZoomControls/>
                </Slide>
            </Deck>
        )
    }
}