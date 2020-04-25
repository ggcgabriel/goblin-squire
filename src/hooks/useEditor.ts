import { useCallback } from 'react';

import Konva from 'konva';

import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '../store';
import { EditorState, Creators, ShapeTypes } from '../store/ducks/editor';

const useEditor = () => {
  const dispatch = useDispatch();

  const {
    selectedNode: selectedShape,
    isEditing,
    grid: { nodes },
  } = useSelector<ApplicationState, EditorState>((state) => state.editor);

  const toggleIsEditing = useCallback(() => {
    dispatch(Creators.toggleEditing());
  }, [dispatch]);

  const isSelected = useCallback(
    (shapeId?: string): boolean => {
      return (
        selectedShape !== undefined &&
        shapeId !== undefined &&
        selectedShape.config.id() === shapeId
      );
    },
    [selectedShape]
  );

  const addShape = useCallback(
    (config: Konva.Shape, shapeType: ShapeTypes) => {
      dispatch(Creators.addShape(config, shapeType));
    },
    [dispatch]
  );

  const selectShape = useCallback(
    (
      shapeId: string | undefined,
      config: Konva.Shape,
      shapeType: ShapeTypes,
      force = false
    ) => {
      if ((shapeId && !isSelected(shapeId)) || force) {
        dispatch(Creators.setSelectedNode(config, shapeType));
      }
    },
    [dispatch, isSelected]
  );

  const updateShape = useCallback(
    (
      shapeId: string | undefined,
      newConfig: Konva.Shape,
      shapeType: ShapeTypes
    ) => {
      if (shapeId && isSelected(shapeId)) {
        dispatch(Creators.updateShape(shapeId, shapeType, newConfig));
        selectShape(shapeId, newConfig, shapeType, true);
      }
    },
    [dispatch, isSelected, selectShape]
  );

  const unselectShape = useCallback(() => {
    dispatch(Creators.setSelectedNode(null));
  }, [dispatch]);

  const deleteShape = useCallback(
    (shapeId: string | undefined, shapeType: ShapeTypes) => {
      if (shapeId) {
        if (isSelected(shapeId)) {
          unselectShape();
        }

        dispatch(Creators.removeShape(shapeId, shapeType));
      }
    },
    [dispatch, unselectShape, isSelected]
  );

  return {
    isEditing,
    toggleIsEditing,
    nodes,
    isSelected,
    addShape,
    selectShape,
    updateShape,
    deleteShape,
    unselectShape,
    selectedShape,
  };
};

export default useEditor;
