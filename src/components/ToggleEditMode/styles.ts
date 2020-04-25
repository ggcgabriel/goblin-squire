import styled from 'styled-components';

import { Flex } from 'dreampact';

export const ToggleEditModeStyle = styled(Flex).attrs({
  direction: 'row',
  justifyContent: 'space-between',
})`
  border-radius: 2px;
  position: relative;
  border: solid 1px
    ${({
      theme: {
        app: {
          toolbar: { border },
        },
      },
    }) => border};
  background: ${({
    theme: {
      app: {
        toolbar: { background },
      },
    },
  }) => background};
`;

export const TogglerLabel = styled.small`
  font-size: 12px;
  margin-left: 15px;
  font-weight: bold;
  color: ${({
    theme: {
      app: {
        toolbar: {
          icon: { color },
        },
      },
    },
  }) => color};
  text-transform: uppercase;
  user-select: none;
  cursor: default;
`;

export const TogglerStyle = styled(Flex).attrs({
  flex: '1 1 auto',
  alignItems: 'center',
})`
  cursor: pointer;
  width: 80px;
  height: 30px;
  margin-left: 15px;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
`;

export const TogglerTextStyle = styled.span<{ isEditing: boolean }>`
  user-select: none;
  height: 25px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
  position: absolute;
  transition: all ease 0.3s;
  color: ${({
    isEditing,
    theme: {
      colors: { dark },
    },
  }) => (!isEditing ? dark : '#fff')};
  background: ${({
    isEditing,
    theme: {
      colors: { light, primary },
    },
  }) => (!isEditing ? light : primary)};
  margin: 0 5px;

  transform: ${({ isEditing }) =>
    isEditing ? `translateX(100%)` : `translateX(0%)`};
`;

TogglerTextStyle.defaultProps = {
  isEditing: false,
};
