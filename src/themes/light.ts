import { theme } from 'dreampact';

const lightAppTheme = {
  app: {
    toolbar: {
      background: '#fff',
      border: '#404040',
      icon: {
        color: '#404040',
        colorHover: '#000',
        background: '#fff',
        backgroundHover: '#fff',
        border: '#fff',
        borderHover: '#404040',
      },
    },
  },
};

export const lightTheme = { ...theme, ...lightAppTheme };
