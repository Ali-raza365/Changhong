import { light, dark } from "../../common/theme";
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
    PUSH_INTO_CART,
    RESET_CART_ARRAY,
} from '../actions/types'

const INITIAL_STATE = {

    stock_loading: false,
    stock_order_loading: false,
    stocks: [],
    sale_loading: false,
    salereport: [],
    cartarray: []
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_STOCK_LOADING:
            return { ...state, stock_loading: true };
        case GET_STOCK_SUCCESS:
            return {
                ...state,
                stock_loading: false,
                stocks: action.payload,
            };
        case GET_STOCK_FAILED:
            return { ...state, stock_loading: false };

        case STOCK_ORDER_LOADING:
            return { ...state, stock_order_loading: true };
        case STOCK_ORDER_SUCCESS:
            return {
                ...state,
                stock_order_loading: false,

            };
        case STOCK_ORDER_FAILED:
            return { ...state, stock_order_loading: false };


        case GET_SALE_LOADING:
            return { ...state, sale_loading: true };
        case GET_SALE_SUCCESS:
            return {
                ...state,
                sale_loading: false,
                salereport: action.payload,
            };
        case GET_SALE_FAILED:
            return { ...state, sale_loading: false };


        case PUSH_INTO_CART:
            let array1 = [...action.payload, ...state.cartarray]
            let array2 = array1.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
            return { ...state, cartarray: [...array2] };

        case RESET_CART_ARRAY:
            return { ...state, cartarray: [] };

        case ADD_TO_CART:
            let arr = state.cartarray;

            arr = arr.map((item) => {
                if (item.id == action.payload) {
                    return {
                        ...item,
                        Quantity: +item.Quantity + 1,
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            })
            return { ...state, cartarray: [...arr] };
        case REMOVE_TO_CART:
            let rarr = state.cartarray;
            rarr = rarr.map((item) => {
                if (item.id == action.payload) {
                    if (+item.Quantity >= 1) {
                        return {
                            ...item,
                            Quantity: +item.Quantity - 1,
                        }
                    } else {
                        return {
                            ...item,
                        }
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            })

            return { ...state, cartarray: [...rarr] };



        default:
            return state;
    }
}