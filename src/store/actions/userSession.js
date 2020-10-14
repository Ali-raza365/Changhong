//auth actions...
import { 
    SET_USER
  } from './types';
  
  export const setUser = (user) => {
    return async dispatch => {
        dispatch({
            type: SET_USER,
            payload: user
        })
      }
  }