import React from 'react';
import Title from '../Title';
import './index.css';

export default (props) => {
    return (
        <div className="title-slide">
            <h1>{props.title}</h1>
            <h2>{props.authorName}</h2>
        </div>
    )
}
