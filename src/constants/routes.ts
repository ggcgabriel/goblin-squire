import { Editor } from '../pages';

export const paths = {
  editor: '/',
  login: 'login',
};

export const routes = [
  {
    key: Math.random(),
    path: paths.editor,
    exact: true,
    component: Editor,
  },
];
