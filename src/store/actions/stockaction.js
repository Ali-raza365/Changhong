import {

    GET_STOCK_LOADING,
    GET_STOCK_SUCCESS,
    GET_STOCK_FAILED,

    GET_SALE_LOADING,
    GET_SALE_SUCCESS,
    GET_SALE_FAILED,


    STOCK_ORDER_LOADING,
    STOCK_ORDER_SUCCESS,
    STOCK_ORDER_FAILED,

    ADD_TO_CART,
    REMOVE_TO_CART,
    RESET_CART_ARRAY,
    PUSH_INTO_CART

} from './types';
import preferences from '../../common/preferences';
import * as ApiServices from '../../services/index';
import { _showErrorMessage } from '../../utils/Errorhandler'




export const _GETStocks = () => {
    return async dispatch => {
        console.log("_GETStocks Actions")
        dispatch({
            type: GET_STOCK_LOADING,
        });
        ApiServices._GetStockApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_STOCK_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_STOCK_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_STOCK_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_STOCK_FAILED,
                });
            });
    }
}

export const _PushIntoCart = (arr) => {
    return ((dispatch) => {
        dispatch({
            type: PUSH_INTO_CART,
            payload: arr
        })
    });
};


export const _AddToCart = (id) => {
    return ((dispatch) => {
        dispatch({
            type: ADD_TO_CART,
            payload: id
        })
    });
};

export const _RemoveToCart = (id) => {
    return ((dispatch) => {
        dispatch({
            type: REMOVE_TO_CART,
            payload: id
        })
    });
};



export const _StockOrder = (details, navigation) => {
    return async dispatch => {
        console.log("_StockOrder Actions")
        dispatch({
            type: STOCK_ORDER_LOADING,
        });
        ApiServices._StockOrderApi(details)
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        dispatch({
                            type: STOCK_ORDER_FAILED,
                        });
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                    } else if (data.success) {
                        dispatch({
                            type: STOCK_ORDER_SUCCESS,
                        });
                        alert(data.success.message);
                        navigation.navigate('Conformation',);
                        dispatch({
                            type: RESET_CART_ARRAY,
                            payload: []
                        })
                    }
                } else {
                    dispatch({
                        type: STOCK_ORDER_FAILED,
                    });
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: STOCK_ORDER_FAILED,
                });
            });
    }
}



export const _GETSale = (body) => {
    return async dispatch => {
        console.log("_GETSale Actions")
        dispatch({
            type: GET_SALE_LOADING,
        });
        ApiServices._GetSaleReportApi(body)
            .then((data) => {
                // console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_SALE_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_SALE_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_SALE_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_SALE_FAILED,
                });
            });
    }
}

