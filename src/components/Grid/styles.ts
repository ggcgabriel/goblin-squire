import styled from 'styled-components';

import { ToolbarStyle } from './Toolbar';
import { ToggleEditModeStyle } from './ToggleEditMode';

const GridStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  ${ToolbarStyle} {
    position: absolute;
    left: 10px;
    top: 40%;
    transform: translateY(-40%);
  }

  ${ToggleEditModeStyle} {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 15px;
  }
`;

export default GridStyle;
