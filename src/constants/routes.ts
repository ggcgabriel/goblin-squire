import { v4 } from 'uuid';

import { Editor } from '../pages';

export const paths = {
  editor: '/',
  login: 'login',
};

export const routes = [
  {
    key: v4(),
    path: paths.editor,
    exact: true,
    component: Editor,
  },
];
