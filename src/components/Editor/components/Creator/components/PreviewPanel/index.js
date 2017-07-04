import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import StaticSlide from './components/StaticSlide';
import { Scrollbars } from 'react-custom-scrollbars';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { cloneDeep } from 'lodash';

const PreviewPanel = (props) => {
    const { slides, wpId, version, onClick, height, width, activeSlideIndex, handleUpdate} = props;

    const SortableStaticSlide = SortableElement(( { slide, sortIndex }) =>
        <StaticSlide
            handleRemove={() => handleSlideRemove(sortIndex)}
            slide={slide}
            wpId={wpId}
            slideNumber={sortIndex + 1}
            isActive={activeSlideIndex === sortIndex}
            version={version}
            onClick={onClick} />
    );

    const SortableSlideList = SortableContainer(() =>
        <span>
          {slides.map((singleSlide, index) =>
            <SortableStaticSlide
              slide={singleSlide}
              index={index}
              key={`static-slide-${index}`}
              sortIndex={index}/>)
          }
        </span>
    );

    const onSortEnd = ({ oldIndex, newIndex })=> {
      const slidesCopy = cloneDeep(slides);
      const temp = slidesCopy[oldIndex];
      slidesCopy[oldIndex] = slidesCopy[newIndex];
      slidesCopy[newIndex] = temp;

      handleUpdate({ slides: slidesCopy, newActiveIndex: newIndex });
    };

    const handleSlideRemove = index => {
        const slidesCopy = cloneDeep(slides);
        slidesCopy.splice(index, 1);
        let newActiveIndex = activeSlideIndex;
        if (index === activeSlideIndex)
            newActiveIndex = index - 1;

        newActiveIndex = Math.max(0, newActiveIndex);
        newActiveIndex = Math.min(newActiveIndex, slidesCopy.length - 1);

        handleUpdate({ slides: slidesCopy, newActiveIndex });
    };

    return (
        <Scrollbars
          className="preview-panel"
          style={{ width, height, whiteSpace: 'nowrap', overflowY: 'hidden' }}>
            <SortableSlideList
              axis="x"
              lockAxis
              onSortEnd={onSortEnd}
              distance={5}
            />
        </Scrollbars>
    )
};

PreviewPanel.propTypes = {
    slides: PropTypes.array.isRequired,
    wpId: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    activeSlideIndex: PropTypes.number.isRequired,
    handleUpdate: PropTypes.func.isRequired,
};

export default PreviewPanel;