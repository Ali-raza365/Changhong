import {

     GET_MRP_LOADING,
     GET_MRP_SUCCESS,
     GET_MRP_FAILED,

     GET_MRP_PRODUCT_LOADING,
     GET_MRP_PRODUCT_SUCCESS,
     GET_MRP_PRODUCT_FAILED

} from './types';
import preferences from '../../common/preferences';
import * as ApiServices from '../../services/index';
import { _showErrorMessage } from '../../utils/Errorhandler'




export const _GETMRP = () => {
     return async dispatch => {
          console.log("_GETMRP Actions")
          dispatch({
               type: GET_MRP_LOADING,
          });
          ApiServices._GetMRPApi()
               .then((data) => {
                    console.log(data, "_")
                    if (data) {
                         if (data.errors) {
                              console.log(data, "_Error")
                              _showErrorMessage(Object.values(data.errors)[0])
                              dispatch({
                                   type: GET_MRP_FAILED,
                              });
                         } else if (data.success) {
                              dispatch({
                                   type: GET_MRP_SUCCESS,
                                   payload: data.success.data
                              });
                         }
                    } else {
                         console.log(data, "_Empty")
                         // _showErrorMessage()
                         dispatch({
                              type: GET_MRP_FAILED,
                         });
                    }
               })
               .catch((error) => {
                    console.log(error)
                    _showErrorMessage(error.message)
                    dispatch({
                         type: GET_MRP_FAILED,
                    });
               });
     }
}


export const _GETMRPProduct = (details) => {
     return async dispatch => {
          console.log("_GETMRPProduct Actions")
          dispatch({
               type: GET_MRP_PRODUCT_LOADING,
          });
          ApiServices._GetMRPProductApi(details)
               .then((data) => {
                    console.log(data, "_")
                    if (data) {
                         if (data.errors) {
                              console.log(data, "_Error")
                              _showErrorMessage(Object.values(data.errors)[0])
                              dispatch({
                                   type: GET_MRP_PRODUCT_FAILED,
                              });
                         } else if (data.success) {
                              dispatch({
                                   type: GET_MRP_PRODUCT_SUCCESS,
                                   payload: data.success.data
                              });
                         }
                    } else {
                         console.log(data, "_Empty")
                         // _showErrorMessage()
                         dispatch({
                              type: GET_MRP_PRODUCT_FAILED,
                         });
                    }
               })
               .catch((error) => {
                    console.log(error)
                    _showErrorMessage(error.message)
                    dispatch({
                         type: GET_MRP_PRODUCT_FAILED,
                    });
               });
     }
}

