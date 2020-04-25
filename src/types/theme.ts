import { Theme } from 'dreampact';

export type LocalTheme = {
  app: {
    editor: {
      sidebar: {
        background: string;
        border: string;
        color: string;
        colorHover: string;
      };
    };
    toolbar: {
      background: string;
      border: string;
      icon: {
        color: string;
        colorHover: string;
        background: string;
        backgroundHover: string;
        border: string;
        borderHover: string;
      };
    };
  };
};

export type AppTheme = Theme & LocalTheme;
