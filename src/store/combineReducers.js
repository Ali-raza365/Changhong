import { combineReducers } from 'redux';
import appReducer from './reducers/app';
import userSession from './reducers/userSession';

export default combineReducers({
  app: appReducer,
  userSession: userSession
});
