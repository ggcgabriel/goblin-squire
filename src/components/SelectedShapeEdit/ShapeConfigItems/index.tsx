import React, { useCallback } from 'react';

import Konva from 'konva';

import { Input, Text, Flex } from 'dreampact';

import { ShapeConfigItemsProps } from './types';

import {
  ShapeConfigItemsStyle,
  LabelStyle,
  ItemRow,
  DoubleItemRow,
} from './styles';

export default function ShapeConfigItems(props: ShapeConfigItemsProps) {
  const { shapeType, shape, updateShape } = props;

  const onPositionChange = useCallback(
    (position: { x: number; y: number }) => {
      shape.setAttrs(position);
      updateShape(shape.id(), shape, shapeType);
    },
    [updateShape, shapeType, shape]
  );

  const onSizeChange = useCallback(
    (sizes: { width: number; height: number }) => {
      shape.setAttrs(sizes);
      updateShape(shape.id(), shape, shapeType);
    },
    [updateShape, shapeType, shape]
  );

  const onBorderRadiusChange = useCallback(
    (radio: number) => {
      shape.setAttrs({ cornerRadius: radio });
      updateShape(shape.id(), shape, shapeType);
    },
    [updateShape, shapeType, shape]
  );

  const onOpacityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const opacity = parseFloat(e.target.value);

      shape.setAttrs({ opacity });
      updateShape(shape.id(), shape, shapeType);
    },
    [updateShape, shapeType, shape]
  );

  const onColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, colorType: 'stroke' | 'fill') => {
      const colorProps: { [key: string]: string } = {};
      colorProps[colorType] = e.target.value;
      shape.setAttrs(colorProps);
      updateShape(shape.id(), shape, shapeType);
    },
    [updateShape, shapeType, shape]
  );

  const onUpdateDraggable = useCallback(
    (checked: boolean) => {
      shape.setAttrs({ draggable: checked });
      updateShape(shape.id(), shape, shapeType);
    },
    [updateShape, shapeType, shape]
  );

  const onUpdateText = useCallback(
    (text: string) => {
      shape.setAttrs({ text });
      updateShape(shape.id(), shape, shapeType);
    },
    [updateShape, shapeType, shape]
  );

  return (
    <ShapeConfigItemsStyle direction="column" grow={0}>
      <Text text={`Editing ${shapeType}`} as="h5" />
      <ItemRow>
        <LabelStyle as="small">ID</LabelStyle>
        <Input defaultValue={shape.id()} disabled />
      </ItemRow>
      {shapeType === 'text' && (
        <ItemRow>
          <LabelStyle as="small">Text</LabelStyle>
          <Input
            {...{ as: 'textarea' }}
            style={{ height: '80px' }}
            value={(shape as Konva.Text).text()}
            onChange={(e) => onUpdateText(e.target.value)}
          />
        </ItemRow>
      )}
      <ItemRow>
        <LabelStyle as="small">Positions</LabelStyle>
        <DoubleItemRow>
          <Flex direction="column">
            <LabelStyle as="small">x</LabelStyle>
            <Input
              value={shape.getPosition().x}
              type="number"
              onChange={(e) =>
                onPositionChange({
                  x: Number(e.target.value),
                  y: shape.getPosition().y,
                })
              }
            />
          </Flex>
          <Flex direction="column">
            <LabelStyle as="small">y</LabelStyle>
            <Input
              value={shape.getPosition().y}
              type="number"
              onChange={(e) =>
                onPositionChange({
                  x: shape.getPosition().x,
                  y: Number(e.target.value),
                })
              }
            />
          </Flex>
        </DoubleItemRow>
      </ItemRow>
      <ItemRow>
        <LabelStyle as="small">Size</LabelStyle>
        <DoubleItemRow>
          <Flex direction="column">
            <LabelStyle as="small">Width</LabelStyle>
            <Input
              value={shape.size().width}
              type="number"
              onChange={(e) =>
                onSizeChange({
                  width: Number(e.target.value),
                  height: shape.size().height,
                })}
            />
          </Flex>
          <Flex direction="column">
            <LabelStyle as="small">Height</LabelStyle>
            <Input
              value={shape.size().height}
              type="number"
              onChange={(e) =>
                onSizeChange({
                  width: shape.size().width,
                  height: Number(e.target.value),
                })}
            />
          </Flex>
        </DoubleItemRow>
      </ItemRow>
      {shapeType === 'rectangle' && (
        <ItemRow>
          <LabelStyle as="small">Border radius</LabelStyle>
          <Input
            value={shape.getAttrs().cornerRadius}
            type="number"
            onChange={(e) =>
              onBorderRadiusChange(
                parseFloat(e.target.value === '' ? '0' : e.target.value)
              )}
          />
        </ItemRow>
      )}
      <ItemRow>
        <LabelStyle as="small">Opacity</LabelStyle>
        <Input
          value={shape.opacity()}
          type="range"
          max={1}
          min={0}
          step="0.1"
          onChange={onOpacityChange}
        />
      </ItemRow>
      <ItemRow>
        <LabelStyle as="small">Colors</LabelStyle>
        <DoubleItemRow>
          <Flex direction="column">
            <LabelStyle as="small">
              {shapeType === 'text' ? 'Text color' : 'Fill'}
            </LabelStyle>
            <Input
              value={shape.fill()}
              onChange={(e) => onColorChange(e, 'fill')}
              type="color"
            />
          </Flex>
          <Flex direction="column">
            <LabelStyle as="small">Border</LabelStyle>
            <Input
              value={shape.stroke()}
              onChange={(e) => onColorChange(e, 'stroke')}
              type="color"
            />
          </Flex>
        </DoubleItemRow>
      </ItemRow>
      <ItemRow>
        <LabelStyle as="small">Draggable</LabelStyle>
        <Flex alignItems="center">
          <Input
            style={{ width: '20px', marginRight: '10px' }}
            checked={shape.draggable()}
            type="checkbox"
            onChange={(e) => onUpdateDraggable(e.target.checked)}
          />
          <Text text={shape.draggable() ? 'Yes' : 'No'} />
        </Flex>
      </ItemRow>
    </ShapeConfigItemsStyle>
  );
}
