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
    selectShape(shapeProps.id, shapeProps, 'text');
  }, [selectShape, shapeProps]);

  const updateText = (newConfig: Konva.TextConfig) => {
    updateShape(shapeProps.id, newConfig, 'text');
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
          e.target.moveToTop();
          onSelect();
        }}
        onDblClick={(e) => {
          const transformer = trRef.current;
          const node = shapeRef.current;

          if (!node || !transformer) {
            return;
          }

          const stage = node.getStage();
          const layer = node.getLayer();

          if (!stage || !layer) {
            return;
          }

          transformer.hide();
          node.hide();

          layer.batchDraw();

          const textPosition = node.getAbsolutePosition();
          const stageBox = stage?.container()?.getBoundingClientRect();

          const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
          };

          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);

          textarea.value = node.text();
          textarea.style.position = 'absolute';
          textarea.style.top = `${areaPosition.y}px`;
          textarea.style.left = `${areaPosition.x}px`;
          textarea.style.width = `${node.width() - node.padding() * 2}px`;
          textarea.style.height = `${node.height() - node.padding() * 2 + 5}px`;
          textarea.style.fontSize = `${node.fontSize()}px`;
          textarea.style.border = 'none';
          textarea.style.padding = '0px';
          textarea.style.margin = '0px';
          textarea.style.overflow = 'hidden';
          textarea.style.background = 'none';
          textarea.style.outline = 'none';
          textarea.style.resize = 'none';
          textarea.style.lineHeight = node.lineHeight().toString();
          textarea.style.fontFamily = node.fontFamily();
          textarea.style.transformOrigin = 'left top';
          textarea.style.textAlign = node.align();
          textarea.style.color = node.fill();

          const rotation = node.rotation();

          let transform = '';
          if (rotation) {
            transform += `rotateZ(${rotation}deg)`;
          }

          let px = 0;
          const isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

          if (isFirefox) {
            px += 2 + Math.round(node.fontSize() / 20);
          }

          transform += `translateY(-${px}px)`;
          textarea.style.transform = transform;
          textarea.style.height = 'auto';
          // after browsers resized it we can set actual value
          textarea.style.height = `${textarea.scrollHeight + 3}px`;
          textarea.focus();

          function handleOutsideClick(evt: MouseEvent) {
            if (evt.target !== textarea) {
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              removeTextarea();
            }
          }

          function removeTextarea() {
            if (textarea.parentNode) {
              textarea.parentNode.removeChild(textarea);
              window.removeEventListener('click', handleOutsideClick);

              if (node && transformer && layer) {
                node.show();
                transformer.show();
                transformer.update();
                layer.batchDraw();
              }
            }
          }

          function setTextareaWidth(width: number) {
            if (node) {
              let newWidth = width || node.getTextWidth() * node.fontSize();
              // some extra fixes on different browsers
              const isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
              );
              const isFirefoxBrowser =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
              if (isSafari || isFirefoxBrowser) {
                newWidth = Math.ceil(newWidth);
              }
              textarea.style.width = `${newWidth}px`;
            }
          }

          textarea.addEventListener(
            'keydown',
            (keyboardEvent: KeyboardEvent) => {
              // hide on enter
              // but don't hide on shift + enter
              if (keyboardEvent.keyCode === 13 && !keyboardEvent.shiftKey) {
                node.text(textarea.value);
                removeTextarea();
              }
              // on esc do not set value back to node
              if (keyboardEvent.keyCode === 27) {
                removeTextarea();
              }
            }
          );

          textarea.addEventListener(
            'keydown',
            (keyboardEvent: KeyboardEvent) => {
              const scale = node.getAbsoluteScale().x;
              setTextareaWidth(node.width() * scale);
              textarea.style.height = 'auto';
              textarea.style.height = `${
                textarea.scrollHeight + node.fontSize()
              }px`;
            }
          );

          setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
          });
        }}
        onDragEnd={(e) => {
          updateText({
            ...shapeProps,
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
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(oldBox, newBox) => {
            // eslint-disable-next-line no-param-reassign
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default memo(Text);
