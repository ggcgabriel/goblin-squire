import { createActions, createReducer } from 'reduxsauce';
import { Action } from 'redux';
import Konva from 'konva';

export type ShapeTypes = 'circle' | 'rectangle' | 'text' | 'image';
export type EditorState = {
  isEditing: boolean;
  selectedNode?: {
    shapeType: ShapeTypes;
    config: Konva.Shape;
  };
  grid: {
    nodes: {
      rectangles: Konva.Rect[];
      circles: Konva.Circle[];
      texts: Konva.Text[];
      images: Konva.Image[];
    };
  };
};

// Initial editor state
const INITIAL_STATE: EditorState = {
  isEditing: false,
  selectedNode: undefined,
  grid: {
    nodes: {
      rectangles: [],
      circles: [],
      texts: [],
      images: [],
    },
  },
};

/**
 * Create theme types
 */

type Types = {
  SET_IS_EDITING: string;
  SET_SELECTED_NODE: string;
  TOGGLE_EDITING: string;
  ADD_SHAPE: string;
  UPDATE_SHAPE: string;
  REMOVE_SHAPE: string;
};

type Creators = {
  setIsEditing: (isEditing: boolean) => EditorState;
  setSelectedNode: (
    config: Konva.Shape | null,
    shapeType?: ShapeTypes
  ) => EditorState;
  addShape: (config: Konva.Shape, shapeType: ShapeTypes) => EditorState;
  removeShape: (nodeId: string, shapeType: ShapeTypes) => EditorState;
  updateShape: (
    nodeId: string,
    shapeType: ShapeTypes,
    config: Konva.Shape
  ) => EditorState;
  toggleEditing: () => EditorState;
};

type ActionType = Action & {
  isEditing?: boolean;
  config?: Konva.Shape;
  nodeId?: string;
  shapeType?: ShapeTypes;
};

/**
 * Create Types And Creators to dispatch editor events
 */
export const { Types, Creators } = createActions<Types, Creators>({
  setIsEditing: ['isEditing'],
  setSelectedNode: ['config', 'shapeType'],
  toggleEditing: null,
  addShape: ['config', 'shapeType'],
  removeShape: ['nodeId', 'shapeType'],
  updateShape: ['nodeId', 'shapeType', 'config'],
});

/**
 * Create Handlers to editor reducer
 */
const addShape = (state = INITIAL_STATE, action: ActionType): EditorState => {
  if (action.shapeType === 'circle') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          circles: [...state.grid.nodes.circles, action.config as Konva.Circle],
        },
      },
    };
  }
  if (action.shapeType === 'rectangle') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          rectangles: [
            ...state.grid.nodes.rectangles,
            action.config as Konva.Rect,
          ],
        },
      },
    };
  }

  if (action.shapeType === 'image') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          images: [...state.grid.nodes.images, action.config as Konva.Image],
        },
      },
    };
  }

  return {
    ...state,
    grid: {
      nodes: {
        ...state.grid.nodes,
        texts: [...state.grid.nodes.texts, action.config as Konva.Text],
      },
    },
  };
};

const removeShape = (
  state = INITIAL_STATE,
  action: ActionType
): EditorState => {
  if (action.shapeType === 'circle') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          circles: state.grid.nodes.circles.filter(
            (c) => c.id() !== action.nodeId
          ),
        },
      },
    };
  }
  if (action.shapeType === 'rectangle') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          rectangles: state.grid.nodes.rectangles.filter(
            (c) => c.id() !== action.nodeId
          ),
        },
      },
    };
  }

  if (action.shapeType === 'image') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          images: state.grid.nodes.images.filter(
            (c) => c.id() !== action.nodeId
          ),
        },
      },
    };
  }

  return {
    ...state,
    grid: {
      nodes: {
        ...state.grid.nodes,
        texts: state.grid.nodes.texts.filter((c) => c.id() !== action.nodeId),
      },
    },
  };
};

const updateShape = (
  state = INITIAL_STATE,
  action: ActionType
): EditorState => {
  if (action.shapeType === 'circle') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          circles: [
            ...state.grid.nodes.circles.filter((c) => c.id() !== action.nodeId),
            action.config as Konva.Circle,
          ],
        },
      },
    };
  }
  if (action.shapeType === 'rectangle') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          rectangles: [
            ...state.grid.nodes.rectangles.filter(
              (c) => c.id() !== action.nodeId
            ),
            action.config as Konva.Rect,
          ],
        },
      },
    };
  }

  if (action.shapeType === 'image') {
    return {
      ...state,
      grid: {
        nodes: {
          ...state.grid.nodes,
          images: [
            ...state.grid.nodes.images.filter((c) => c.id() !== action.nodeId),
            action.config as Konva.Image,
          ],
        },
      },
    };
  }

  return {
    ...state,
    grid: {
      nodes: {
        ...state.grid.nodes,
        texts: [
          ...state.grid.nodes.texts.filter((c) => c.id() !== action.nodeId),
          action.config as Konva.Text,
        ],
      },
    },
  };
};

const setIsEditing = (
  state = INITIAL_STATE,
  action: ActionType
): EditorState => {
  return {
    ...state,
    isEditing: action.isEditing || state.isEditing,
  };
};

const setSelectedNode = (
  state = INITIAL_STATE,
  action: ActionType
): EditorState => {
  return {
    ...state,
    selectedNode:
      action.config != null
        ? {
            config: action.config as Konva.Shape,
            shapeType: action.shapeType as ShapeTypes,
          }
        : undefined,
  };
};

const toggleEditing = (state = INITIAL_STATE): EditorState => {
  return {
    ...state,
    isEditing: !state.isEditing,
  };
};

/**
 * Create Editor Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.SET_IS_EDITING]: setIsEditing,
  [Types.SET_SELECTED_NODE]: setSelectedNode,
  [Types.TOGGLE_EDITING]: toggleEditing,
  [Types.ADD_SHAPE]: addShape,
  [Types.UPDATE_SHAPE]: updateShape,
  [Types.REMOVE_SHAPE]: removeShape,
});
