import { light, dark } from "../../common/theme";
import {
     LOGIN_LOADING,
     LOGIN_SUCCESS,
     LOGIN_FAILED,
     REGISTER_LOADING,
     REGISTER_SUCCESS,
     REGISTER_FAILED,
} from '../actions/types'

const INITIAL_STATE = {
     login_loading: false,
     register_loading: false,
     user: null
}

export default function (state = INITIAL_STATE, action) {
     switch (action.type) {
          case LOGIN_LOADING:
               return { ...state, login_loading: true };
          case LOGIN_SUCCESS:
               return {
                    ...state,
                    login_loading: false,
                    user: action.payload
               };
          case LOGIN_FAILED:
               return { ...state, login_loading: false };

          case REGISTER_LOADING:
               return { ...state, register_loading: true };
          case REGISTER_SUCCESS:
               return {
                    ...state,
                    register_loading: false,
                    user: action.payload
               };
          case REGISTER_FAILED:
               return { ...state, register_loading: false };
          default:
               return state;
     }
}