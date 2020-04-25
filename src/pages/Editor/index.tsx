import React from 'react';

import { EditorStyle, EditorSidebarStyle, ContentStyle } from './styles';

import Grid from '../../components/Grid';
import Toolbar from '../../components/Toolbar';
import ToggleEditMode from '../../components/ToggleEditMode';
import SelectedShapeEdit from '../../components/SelectedShapeEdit';

export function Editor() {
  return (
    <EditorStyle>
      <ContentStyle>
        <Grid />
        <ToggleEditMode />
      </ContentStyle>
      <EditorSidebarStyle>
        <SelectedShapeEdit />
      </EditorSidebarStyle>

      <Toolbar />
    </EditorStyle>
  );
}
