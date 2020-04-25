import React, { memo } from 'react';

import { SelectedShapeEditStyle } from './styles';

import { useEditor } from '../../hooks';

import ShapeConfigItems from './ShapeConfigItems';

function SelectedShapeEdit() {
  const { selectedShape, updateShape } = useEditor();

  return (
    <SelectedShapeEditStyle>
      {selectedShape && (
        <ShapeConfigItems
          updateShape={updateShape}
          shape={selectedShape.config}
          shapeType={selectedShape.shapeType}
        />
      )}
    </SelectedShapeEditStyle>
  );
}

export default memo(SelectedShapeEdit);
