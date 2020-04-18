import { createStore } from 'redux';

import reducers from './ducks';

import { EditorState } from './ducks/editor';
import { ThemeState } from './ducks/theme';

export type ApplicationState = {
  theme: ThemeState;
  editor: EditorState;
};

const store = createStore(reducers);

export default store;
