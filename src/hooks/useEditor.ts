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
    grid: {
      nodes: { circles, rectangles, texts },
    },
  } = useSelector<ApplicationState, EditorState>((state) => state.editor);

  const toggleIsEditing = useCallback(() => {
    dispatch(Creators.toggleEditing());
  }, [dispatch]);

  const isSelected = useCallback(
    (shapeId?: string): boolean => {
      return (
        selectedShape !== undefined &&
        shapeId !== undefined &&
        selectedShape.config.id === shapeId
      );
    },
    [selectedShape]
  );

  const selectShape = useCallback(
    (
      shapeId: string | undefined,
      config: Konva.RectConfig,
      shapeType: ShapeTypes
    ) => {
      if (shapeId && !isSelected(shapeId)) {
        dispatch(Creators.setSelectedNode(config, shapeType));
      }
    },
    [dispatch, isSelected]
  );

  const updateShape = useCallback(
    (
      shapeId: string | undefined,
      newConfig: Konva.RectConfig,
      shapeType: ShapeTypes
    ) => {
      if (shapeId && isSelected(shapeId)) {
        dispatch(Creators.updateShape(shapeId, shapeType, newConfig));
      }
    },
    [dispatch, isSelected]
  );

  const deleteShape = useCallback(
    (shapeId: string | undefined, shapeType: ShapeTypes) => {
      if (shapeId) {
        dispatch(Creators.removeShape(shapeId, shapeType));
      }
    },
    [dispatch]
  );

  const unselectShape = useCallback(() => {
    dispatch(Creators.setSelectedNode(null));
  }, [dispatch]);

  return {
    isEditing,
    toggleIsEditing,
    nodes: { circles, rectangles, texts },
    isSelected,
    selectShape,
    updateShape,
    deleteShape,
    unselectShape,
    selectedShape,
  };
};

export default useEditor;
