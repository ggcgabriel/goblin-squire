import styled from 'styled-components';

import { ToolbarItemStyle } from './ToolbarItem';

export const ToolbarStyle = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  user-select: none;
  z-index: 1;
  background: ${({
    theme: {
      app: {
        toolbar: { background },
      },
    },
  }) => background};
  border: solid 1px
    ${({
      theme: {
        app: {
          toolbar: { border },
        },
      },
    }) => border};
  border-radius: 4px;
  padding: 4px;

  ${ToolbarItemStyle} {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;
