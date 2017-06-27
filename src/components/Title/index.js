import React from 'react';
import './index.css';

export default (props) => {
    return (
        <div className="slide-title">
            <h1>{props.title}</h1>
        </div>
    )
}