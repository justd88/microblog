import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import timeline from './timeline';

export default combineReducers({
  router: routerReducer,
  user,
  timeline
});
