//Config for redux globel store
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './combineReducers';

export default configReduxStore = (initialState = {}) => {
  const middleware = compose(
    applyMiddleware(thunk)
  )
  return createStore(rootReducer, initialState, middleware)
}