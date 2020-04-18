import React, { memo } from 'react';

import { useWindowSize } from 'dreampact';

import { Stage, Layer } from 'react-konva';
import Konva from 'konva';

import { Rectangle, Circle, Text } from './shapes';

import GridLayer from './GridLayer';
import Toolbar from './Toolbar';
import ToggleEditMode from './ToggleEditMode';

import GridStyle from './styles';

import useEditor from '../../hooks/useEditor';

function Grid() {
  const { width, height } = useWindowSize();

  const {
    nodes: { circles, rectangles, texts },
    isSelected,
    deleteShape,
    selectShape,
    unselectShape,
    updateShape,
    selectedShape,
  } = useEditor();

  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
  ) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty && selectedShape !== undefined) {
      unselectShape();
    }
  };

  return (
    <GridStyle>
      <Toolbar />
      <Stage
        width={width}
        height={height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <GridLayer />
        <Layer>
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={rect.id}
                shapeProps={rect}
                deleteShape={deleteShape}
                isSelected={isSelected}
                selectShape={selectShape}
                updateShape={updateShape}
              />
            );
          })}

          {circles.map((circle, i) => {
            return (
              <Circle
                key={circle.id}
                shapeProps={circle}
                deleteShape={deleteShape}
                isSelected={isSelected}
                selectShape={selectShape}
                updateShape={updateShape}
              />
            );
          })}

          {texts.map((text, i) => {
            return (
              <Text
                key={text.id}
                shapeProps={text}
                deleteShape={deleteShape}
                isSelected={isSelected}
                selectShape={selectShape}
                updateShape={updateShape}
              />
            );
          })}
        </Layer>
      </Stage>
      <ToggleEditMode />
    </GridStyle>
  );
}

export default memo(Grid);
