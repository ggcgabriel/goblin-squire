import React, { useCallback } from 'react';

import { useWindowSize } from 'dreampact';

import Konva from 'konva';

import { Stage } from 'react-konva';

import { MainStageProps } from './types';

export default function MainStage(props: MainStageProps) {
  const { children, unselectShape, selectedShape } = props;

  const { width, height } = useWindowSize();

  const checkDeselect = useCallback(
    (
      e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
    ) => {
      // deselect when clicked on empty area
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty && selectedShape !== undefined) {
        unselectShape();
      }
    },
    [selectedShape, unselectShape]
  );

  const scaleBy = 1.02;
  const onScroll = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.currentTarget as Konva.Stage;
    const oldScale = stage.scaleX();

    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition) {
      const mousePointTo = {
        x: pointerPosition.x / oldScale - stage.x() / oldScale,
        y: pointerPosition.y / oldScale - stage.y() / oldScale,
      };

      const newScale =
        e.evt.deltaY <= 0 ? oldScale * scaleBy : oldScale / scaleBy;

      if (newScale >= 1 && newScale <= 2.2) {
        stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: -(mousePointTo.x - pointerPosition.x / newScale) * newScale,
          y: -(mousePointTo.y - pointerPosition.y / newScale) * newScale,
        };

        stage.position(newPos);
        stage.batchDraw();
      }
    }
  }, []);

  return (
    <Stage
      width={width - 270}
      height={height}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      onWheel={onScroll}
    >
      {children}
    </Stage>
  );
}
