import { theme } from 'dreampact';
import { LocalTheme } from '../types';

const darkAppTheme: LocalTheme = {
  app: {
    editor: {
      sidebar: {
        background: '#404040',
        border: '#000',
        color: '#d5d2d2',
        colorHover: '#fff',
      },
    },
    toolbar: {
      background: '#404040',
      border: '#000',
      icon: {
        color: '#d5d2d2',
        colorHover: '#fff',
        background: 'transparent',
        backgroundHover: 'transparent',
        border: 'transparent',
        borderHover: '#000',
      },
    },
  },
};

export const darkTheme = { ...theme, ...darkAppTheme };
