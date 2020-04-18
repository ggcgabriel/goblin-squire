import RubikIcon from '../../icons/Rubik';
import CircleIcon from '../../icons/Circle';
import TextIcon from '../../icons/Text';

import { ReactComponent as MoonSvg } from '../../icons/svg/moon.svg';
import { ReactComponent as SunSvg } from '../../icons/svg/sun.svg';

type DispatchEvents = {
  handleAddRectangle: () => void;
  handleAddCircle: () => void;
  handleAddText: () => void;
  handleToggleTheme: () => void;
};

export const toolbarItems = (
  isDarkTheme = false,
  {
    handleAddCircle,
    handleAddRectangle,
    handleAddText,
    handleToggleTheme,
  }: DispatchEvents
) => [
  {
    icon: RubikIcon,
    tooltip: 'Add new Rectangle',
    onClick: handleAddRectangle,
  },
  {
    icon: CircleIcon,
    tooltip: 'Add new Circle',
    onClick: handleAddCircle,
  },
  {
    icon: TextIcon,
    tooltip: 'Add new Text',
    onClick: handleAddText,
  },
  {
    icon: isDarkTheme ? SunSvg : MoonSvg,
    tooltip: `Toggle to ${isDarkTheme ? 'light' : 'dark'} theme`,
    onClick: handleToggleTheme,
  },
];
