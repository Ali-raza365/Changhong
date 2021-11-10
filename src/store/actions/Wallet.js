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

} from './types';
import preferences from '../../common/preferences';
import * as ApiServices from '../../services/index';
import { _showErrorMessage } from '../../utils/Errorhandler'


export const _Withdraw = (details, navigation) => {
     return async dispatch => {
          console.log("Withdraw Actions")
          dispatch({
               type: WALLET_LOADING,
          });
          ApiServices._WalletWithdrawApi(details)
               .then((data) => {
                    console.log(data, "_")
                    if (data) {
                         if (data.errors) {
                              _showErrorMessage(Object.values(data.errors)[0])
                              dispatch({
                                   type: WALLET_FAILED,
                              });
                         } else if (data.success) {
                              alert(Object.values(data.success)[0])
                              dispatch({
                                   type: WALLET_SUCCESS,
                              });
                              navigation.goBack();
                              dispatch(_getBalance())
                         }
                    } else {
                         _showErrorMessage("22")
                         dispatch({
                              type: WALLET_FAILED,
                         });
                    }
               })
               .catch((error) => {
                    console.log(error)
                    console.log(error.response.data, "4343")
                    dispatch({
                         type: WALLET_FAILED,
                    });
                    if (error.response.data.error) {
                         _showErrorMessage(Object.values(error.response.data.error)[0])
                    } else {
                         _showErrorMessage()
                    }
               });
     }
}



export const getTransactionHistory = () => {
     return async dispatch => {
          console.log("getTransactionHistory Actions")
          dispatch({
               type: WALLET_HISTORY_LOADING,
          });
          ApiServices._GetTransactionHistoryApi()
               .then((data) => {
                    console.log(data, "_")
                    if (data) {
                         if (data.errors) {
                              console.log(data, "_Error")
                              _showErrorMessage(Object.values(data.errors)[0])
                              dispatch({
                                   type: WALLET_HISTORY_FAILED,
                              });
                         } else if (data.success) {
                              dispatch({
                                   type: WALLET_HISTORY_SUCCESS,
                                   payload: data.success.data
                              });
                         }
                    } else {
                         console.log(data, "_Empty")
                         // _showErrorMessage()
                         dispatch({
                              type: WALLET_HISTORY_FAILED,
                         });
                    }
               })
               .catch((error) => {
                    console.log(error)
                    _showErrorMessage(error.message)
                    dispatch({
                         type: WALLET_HISTORY_FAILED,
                    });
               });
     }
}



export const _getBalance = () => {
     return async dispatch => {
          console.log("_getBalance Actions")
          dispatch({
               type: GET_BALANCE_LOADING,
          });
          ApiServices._GetWalletBalanceApi()
               .then((data) => {
                    console.log(data, "_")
                    if (data) {
                         if (data.errors) {
                              console.log(data, "_Error")
                              _showErrorMessage(Object.values(data.errors)[0])
                              dispatch({
                                   type: GET_BALANCE_FAILED,
                              });
                         } else if (data.success) {
                              dispatch({
                                   type: GET_BALANCE_SUCCESS,
                                   payload: data.success.balance
                              });
                         }
                    } else {
                         console.log(data, "_Empty")
                         // _showErrorMessage()
                         dispatch({
                              type: GET_BALANCE_FAILED,
                         });
                    }
               })
               .catch((error) => {
                    console.log(error)
                    _showErrorMessage(error.message)
                    dispatch({
                         type: GET_BALANCE_FAILED,
                    });
               });
     }
}


