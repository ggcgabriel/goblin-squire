import { createActions, createReducer } from 'reduxsauce';
import { Action } from 'redux';
import { AppTheme } from '../../types';
import { lightTheme, darkTheme } from '../../themes';

export type ThemeState = AppTheme;

// Initial theme state
const INITIAL_STATE: ThemeState = darkTheme;

/**
 * Create theme types
 */
type Types = {
  SET_THEME: string;
};

type Creators = {
  setTheme: (themeName: string) => AppTheme;
};

type SetThemeActionType = Action & {
  themeName: string;
};

/**
 * Create Types And Creators to dispatch theme events
 */
export const { Types, Creators } = createActions<Types, Creators>({
  setTheme: ['themeName'],
});

/**
 * Create Handlers to theme reducer
 */
const set = (state = INITIAL_STATE, action: SetThemeActionType) => {
  if (action.themeName === 'light') {
    return lightTheme;
  }
  return darkTheme;
};

/**
 * Create Theme Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.SET_THEME]: set,
});
