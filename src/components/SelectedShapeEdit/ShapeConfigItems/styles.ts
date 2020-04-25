import styled from 'styled-components';

import { Flex, Text } from 'dreampact';

export const ShapeConfigItemsStyle = styled(Flex)`
  flex-direction: column;
`;

export const DoubleItemRow = styled(Flex)`
  div {
    width: 50%;
    &:first-child {
      margin-right: 6px;
    }

    &:last-child {
      margin-left: 6px;
    }
  }
`;

export const ItemRow = styled(Flex)`
  flex-direction: column;
  margin-bottom: 16px;
`;

export const LabelStyle = styled(Text)`
  margin: 5px 0px;
  font-size: 11px;
  font-weight: bold;
  user-select: none;
`;
