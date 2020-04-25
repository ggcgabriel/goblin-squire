import styled from 'styled-components';

import { ToolbarStyle } from '../../components/Toolbar';
import { ToggleEditModeStyle } from '../../components/ToggleEditMode';

export const EditorSidebarStyle = styled.div`
  width: 100%;
  max-height: 100vh;
  padding: 8px;
  position: relative;
  overflow: auto;

  color: ${({
    theme: {
      app: {
        editor: {
          sidebar: { color },
        },
      },
    },
  }) => color};

  background: ${({
    theme: {
      app: {
        editor: {
          sidebar: { background },
        },
      },
    },
  }) => background};

  border-left: solid 1px
    ${({
      theme: {
        app: {
          editor: {
            sidebar: { border },
          },
        },
      },
    }) => border};
`;

export const ContentStyle = styled.div`
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  position: relative;

  ${ToggleEditModeStyle} {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const EditorStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;

  ${ToolbarStyle} {
    position: fixed;
    left: 15px;
    top: 40%;
    transform: translateY(-40%);
  }
`;
