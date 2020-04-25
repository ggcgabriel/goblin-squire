import React, { memo } from 'react';

import { Flex } from 'dreampact';

import { useEditor } from '../../hooks';

import {
  ToggleEditModeStyle,
  TogglerStyle,
  TogglerTextStyle,
  TogglerLabel,
} from './styles';

function ToggleEditMode() {
  const { toggleIsEditing, isEditing } = useEditor();

  return (
    <ToggleEditModeStyle>
      <Flex alignItems="center" justity-content="space-between">
        <TogglerLabel>Edit mode</TogglerLabel>
        <TogglerStyle onClick={toggleIsEditing}>
          <TogglerTextStyle isEditing={isEditing}>
            {isEditing ? 'on' : 'off'}
          </TogglerTextStyle>
        </TogglerStyle>
      </Flex>
    </ToggleEditModeStyle>
  );
}

export default memo(ToggleEditMode);

export * from './styles';
