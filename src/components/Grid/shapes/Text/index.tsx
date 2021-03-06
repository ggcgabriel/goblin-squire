import React, { useRef, useEffect, memo, useMemo, useCallback } from 'react';
import { Text as KonvaText, Transformer } from 'react-konva';
import { useKeyPress } from 'dreampact';

import Konva from 'konva';

import { TextProps } from './types';

function Text(props: TextProps) {
  const {
    shapeProps,
    isSelected,
    deleteShape,
    selectShape,
    updateShape,
  } = props;

  const isDeletePressed = useKeyPress('Delete');

  const shapeRef = useRef<Konva.Text>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const selected = useMemo(() => {
    return isSelected(shapeProps.id);
  }, [isSelected, shapeProps.id]);

  const onSelect = useCallback(() => {
    if (shapeRef.current) {
      selectShape(shapeProps.id, shapeRef.current, 'text');
    }
  }, [selectShape, shapeProps]);

  const updateText = (newConfig: {
    x: number;
    y: number;
    width?: number;
    height?: number;
  }) => {
    if (shapeRef.current) {
      shapeRef.current.setAttrs(newConfig);
      updateShape(shapeProps.id, shapeRef.current, 'text');
    }
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
      deleteShape(shapeProps.id, 'text');
    }
  }, [selected, isDeletePressed, deleteShape, shapeProps]);

  return (
    <>
      <KonvaText
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragStart={(e) => {
          onSelect();
        }}
        onDragEnd={(e) => {
          updateText({
            x: e.target.x(),
            y: e.target.y(),
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

            updateText({
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
          enabledAnchors={['middle-left', 'middle-right']}
        />
      )}
    </>
  );
}

export default memo(Text);
