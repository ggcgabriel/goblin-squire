import React, { memo } from 'react';

import { Layer } from 'react-konva';

import { Rectangle, Circle, Text, Image } from './shapes';

import MainStage from './MainStage';
import GridLayer from './GridLayer';

import { GridStyle } from './styles';

import { useEditor } from '../../hooks';

function Grid() {
  const {
    nodes: { circles, rectangles, texts, images },
    isSelected,
    deleteShape,
    selectShape,
    unselectShape,
    updateShape,
    selectedShape,
  } = useEditor();

  return (
    <GridStyle>
      <MainStage unselectShape={unselectShape} selectedShape={selectedShape}>
        <Layer>
          {rectangles.map((rect) => {
            return (
              <Rectangle
                key={rect.getAttrs().id}
                shapeProps={rect.getAttrs()}
                deleteShape={deleteShape}
                isSelected={isSelected}
                selectShape={selectShape}
                updateShape={updateShape}
              />
            );
          })}

          {circles.map((circle) => {
            return (
              <Circle
                key={circle.getAttrs().id}
                shapeProps={circle.getAttrs()}
                deleteShape={deleteShape}
                isSelected={isSelected}
                selectShape={selectShape}
                updateShape={updateShape}
              />
            );
          })}

          {texts.map((text) => {
            return (
              <Text
                key={text.getAttrs().id}
                shapeProps={text.getAttrs()}
                deleteShape={deleteShape}
                isSelected={isSelected}
                selectShape={selectShape}
                updateShape={updateShape}
              />
            );
          })}

          {images.map((image) => {
            return (
              <Image
                key={image.getAttrs().id}
                shapeProps={image.getAttrs()}
                deleteShape={deleteShape}
                isSelected={isSelected}
                selectShape={selectShape}
                updateShape={updateShape}
              />
            );
          })}
        </Layer>
        <GridLayer />
      </MainStage>
    </GridStyle>
  );
}

export default memo(Grid);
export * from './styles';
