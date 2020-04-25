import styled from 'styled-components';

import { SvgStyle } from 'dreampact';

export const ToolbarItemStyle = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;

  svg {
    width: 30px;
    height: 30px;

    fill: ${({
      theme: {
        app: {
          toolbar: {
            icon: { color },
          },
        },
      },
    }) => color};
  }

  border: solid 1px
    ${({
      theme: {
        app: {
          toolbar: {
            icon: { border },
          },
        },
      },
    }) => border};
  background: ${({
    theme: {
      app: {
        toolbar: {
          icon: { background },
        },
      },
    },
  }) => background};

  ${SvgStyle} {
    g {
      fill: ${({
        theme: {
          app: {
            toolbar: {
              icon: { color },
            },
          },
        },
      }) => color};
    }
  }

  :hover {
    background: ${({
      theme: {
        app: {
          toolbar: {
            icon: { backgroundHover },
          },
        },
      },
    }) => backgroundHover};

    border: solid 1px
      ${({
        theme: {
          app: {
            toolbar: {
              icon: { borderHover },
            },
          },
        },
      }) => borderHover};

    svg {
      width: 30px;
      height: 30px;

      fill: ${({
        theme: {
          app: {
            toolbar: {
              icon: { colorHover },
            },
          },
        },
      }) => colorHover};
    }

    ${SvgStyle} {
      g {
        fill: ${({
          theme: {
            app: {
              toolbar: {
                icon: { colorHover },
              },
            },
          },
        }) => colorHover};
      }
    }
  }
`;
