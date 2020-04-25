import Konva from 'konva';
import { ShapeTypes } from '../../../../store/ducks/editor';

export type RectangleShapeProps = Konva.RectConfig;

export type RectangleOnChangeEvent = {
  x: number;
  y: number;
  width?: number;
  height?: number;
} & RectangleShapeProps;

export type RectangleProps = {
  selectShape: (
    shapeId: string | undefined,
    config: Konva.Rect,
    shapeType: ShapeTypes
  ) => void;
  updateShape: (
    shapeId: string | undefined,
    newConfig: Konva.Rect,
    shapeType: ShapeTypes
  ) => void;

  deleteShape: (shapeId: string | undefined, shapeType: ShapeTypes) => void;
  isSelected: (shapeId: string | undefined) => boolean;
  shapeProps: RectangleShapeProps;
};
