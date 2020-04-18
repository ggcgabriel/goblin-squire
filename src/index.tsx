import React from 'react';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import store from './store';

import App from './App';

WebFont.load({
  google: {
    families: ['Montserrat:300,400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
