import Konva from 'konva';
import { ShapeTypes } from '../../../../store/ducks/editor';

export type ImageShapeProps = Konva.ImageConfig;

export type ImageOnChangeEvent = {
  x: number;
  y: number;
  width?: number;
  height?: number;
} & ImageShapeProps;

export type ImageProps = {
  selectShape: (
    shapeId: string | undefined,
    config: Konva.Image,
    shapeType: ShapeTypes
  ) => void;
  updateShape: (
    shapeId: string | undefined,
    newConfig: Konva.Image,
    shapeType: ShapeTypes
  ) => void;

  deleteShape: (shapeId: string | undefined, shapeType: ShapeTypes) => void;
  isSelected: (shapeId: string | undefined) => boolean;
  shapeProps: ImageShapeProps;
};
