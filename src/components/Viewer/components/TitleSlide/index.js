import React from 'react';
import Title from '../Title';
import './index.css';

export default (props) => {
    return (
        <div className="title-slide">
            <Title title={props.title} />
            <h2>{props.authorName}</h2>
        </div>
    )
}
