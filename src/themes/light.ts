import { theme } from 'dreampact';
import { LocalTheme } from '../types';

const lightAppTheme: LocalTheme = {
  app: {
    editor: {
      sidebar: {
        background: '#fff',
        border: '#404040',
        color: '#404040',
        colorHover: '#000',
      },
    },
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
