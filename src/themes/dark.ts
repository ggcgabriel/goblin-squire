import { theme } from 'dreampact';

const darkAppTheme = {
  app: {
    toolbar: {
      background: '#404040',
      border: '#404040',
      icon: {
        color: '#d5d2d2',
        colorHover: '#fff',
        background: 'transparent',
        backgroundHover: 'transparent',
        border: 'transparent',
        borderHover: 'transparent',
      },
    },
  },
};

export const darkTheme = { ...theme, ...darkAppTheme };
