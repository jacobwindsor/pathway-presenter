import React, { Component } from 'react';
import {
    Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
    Heading, Image, Layout, ListItem, List, Quote, Slide, Text
} from 'spectacle';
import { Pvjs } from '@wikipathways/pvjs';
import './index.css';

export default class extends Component {
    render() {
        const slideStyle = {
            height: '100%'
        };

        return (
            <Deck>
                <Slide style={slideStyle}>
                    <Pvjs about="http://identifiers.org/wikipathways/WP4" version="0" showPanZoomControls/>
                </Slide>
            </Deck>
        )
    }
}