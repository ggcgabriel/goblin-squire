import Konva from 'konva';
import { ShapeTypes } from '../../../../store/ducks/editor';

export type CircleShapeProps = Konva.CircleConfig;

export type CircleOnChangeEvent = {
  x: number;
  y: number;
  width?: number;
  height?: number;
} & CircleShapeProps;

export type CircleProps = {
  selectShape: (
    shapeId: string | undefined,
    config: Konva.RectConfig,
    shapeType: ShapeTypes
  ) => void;
  updateShape: (
    shapeId: string | undefined,
    newConfig: Konva.RectConfig,
    shapeType: ShapeTypes
  ) => void;

  deleteShape: (shapeId: string | undefined, shapeType: ShapeTypes) => void;
  isSelected: (shapeId: string | undefined) => boolean;
  shapeProps: CircleShapeProps;
};
