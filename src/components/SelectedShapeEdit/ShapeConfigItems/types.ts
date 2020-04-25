import Konva from 'konva';
import { ShapeTypes } from '../../../store/ducks/editor';

export type ShapeConfigItemsProps = {
  shapeType: ShapeTypes;
  shape: Konva.Shape;
  updateShape: (
    shapeId: string | undefined,
    newConfig: Konva.Shape,
    shapeType: ShapeTypes
  ) => void;
};
