import { light, dark } from "../../common/theme";
import {
     WALLET_LOADING,
     WALLET_SUCCESS,
     WALLET_FAILED,

     WALLET_HISTORY_LOADING,
     WALLET_HISTORY_SUCCESS,
     WALLET_HISTORY_FAILED,


     GET_BALANCE_LOADING,
     GET_BALANCE_SUCCESS,
     GET_BALANCE_FAILED
} from '../actions/types'

const INITIAL_STATE = {

     wallet_Loading: false,
     Wallet_History_loading: false,
     Transactions: [],
     balance_loading: false,
     balance: 0,
}

export default function (state = INITIAL_STATE, action) {
     switch (action.type) {

          case WALLET_LOADING:
               return { ...state, wallet_Loading: true };
          case WALLET_SUCCESS:
               return {
                    ...state,
                    wallet_Loading: false,
               };
          case WALLET_FAILED:
               return { ...state, wallet_Loading: false };

          case WALLET_HISTORY_LOADING:
               return { ...state, Wallet_History_loading: true };
          case WALLET_HISTORY_SUCCESS:
               console.log(action)
               return {
                    ...state,
                    Wallet_History_loading: false,
                    Transactions: action.payload
               };
          case WALLET_HISTORY_FAILED:
               return { ...state, Wallet_History_loading: false };



          case GET_BALANCE_LOADING:
               return { ...state, balance_loading: true };
          case GET_BALANCE_SUCCESS:
               console.log(action)
               return {
                    ...state,
                    balance_loading: false,
                    balance: action.payload
               };
          case GET_BALANCE_FAILED:
               return { ...state, balance_loading: false };
          default:
               return state;
     }
}