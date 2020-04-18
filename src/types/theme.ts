import { Theme } from 'dreampact';

export type AppTheme = Theme & {
  app: {
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
