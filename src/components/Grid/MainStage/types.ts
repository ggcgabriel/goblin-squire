import Konva from 'konva';
import { ShapeTypes } from '../../../store/ducks/editor';

type SelectedShape =
  | {
      shapeType: ShapeTypes;
      config: Konva.Shape;
    }
  | undefined;

export type MainStageProps = {
  children?: JSX.Element[] | JSX.Element;
  unselectShape: () => void;
  selectedShape: SelectedShape;
};
