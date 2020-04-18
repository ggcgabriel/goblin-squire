import { combineReducers } from 'redux';

import theme from './theme';
import editor from './editor';

export default combineReducers({ theme, editor });
