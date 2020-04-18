import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useLocalStorage } from 'dreampact';
import { AppTheme } from '../types';

import { Creators } from '../store/ducks/theme';

const useTheme = (): [AppTheme, () => void, boolean] => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    'isDarkMode',
    false
  );

  const { theme } = useSelector<{ theme: AppTheme }, { theme: AppTheme }>(
    (state) => state
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.setTheme(isDarkMode ? 'dark' : 'light'));
  }, [isDarkMode, dispatch]);

  const toggleTheme = useCallback(() => {
    if (isDarkMode) {
      dispatch(Creators.setTheme('light'));
      setIsDarkMode(false);
    } else {
      dispatch(Creators.setTheme('dark'));
      setIsDarkMode(true);
    }
  }, [setIsDarkMode, dispatch, isDarkMode]);

  return [theme, toggleTheme, isDarkMode];
};

export default useTheme;
