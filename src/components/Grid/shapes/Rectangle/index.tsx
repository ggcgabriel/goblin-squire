import React, { useRef, useEffect, memo, useMemo, useCallback } from 'react';
import { Rect, Transformer } from 'react-konva';
import { useKeyPress } from 'dreampact';

import Konva from 'konva';

import { RectangleProps } from './types';

function Rectangle(props: RectangleProps) {
  const {
    shapeProps,
    isSelected,
    deleteShape,
    selectShape,
    updateShape,
  } = props;

  const isAltPressed = useKeyPress('Alt');
  const isDeletePressed = useKeyPress('Delete');

  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const selected = useMemo(() => {
    return isSelected(shapeProps.id);
  }, [isSelected, shapeProps.id]);

  const onSelect = useCallback(() => {
    selectShape(shapeProps.id, shapeProps, 'rectangle');
  }, [selectShape, shapeProps]);

  const updateRectangle = (newConfig: Konva.RectConfig) => {
    updateShape(shapeProps.id, newConfig, 'rectangle');
  };

  useEffect(() => {
    if (selected) {
      // we need to attach transformer manually
      // eslint-disable-next-line no-unused-expressions
      trRef.current?.setNode(shapeRef.current);
      const layer = trRef.current?.getLayer();

      if (layer) {
        layer.batchDraw();
      }
    }
  }, [selected]);

  useEffect(() => {
    if (selected && isDeletePressed) {
      deleteShape(shapeProps.id, 'rectangle');
    }
  }, [selected, isDeletePressed, deleteShape, shapeProps]);

  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragStart={(e) => {
          e.target.moveToTop();
          onSelect();
        }}
        onDragEnd={(e) => {
          updateRectangle({
            ...shapeProps,
            x: !isAltPressed
              ? Math.round(e.target.x() / 65) * 65
              : e.target.x(),
            y: !isAltPressed
              ? Math.round(e.target.y() / 65) * 65
              : e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;

          // we will reset it back
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            updateRectangle({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }
        }}
      />
      {selected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default memo(Rectangle);
