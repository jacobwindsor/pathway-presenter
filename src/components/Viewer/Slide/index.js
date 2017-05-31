import React from 'react';
import { Pvjs } from '@wikipathways/pvjs';
import { Slide } from 'spectacle';
import './index.css';

export default (props) => {
    const manipulator = props.manipulator;
    const slide = props.slide;
    console.log(slide);
    slide.targets.forEach(singleTarget => {
        if (singleTarget.highlighted) manipulator.highlightOn(singleTarget.entityId, singleTarget.highlightedColor)
    });

    return (
        <Slide key={`slide-${props.slide.id}`} />
    )
}