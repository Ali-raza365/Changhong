import { light, dark } from "../../common/theme";
import {
     GET_MRP_LOADING,
     GET_MRP_SUCCESS,
     GET_MRP_FAILED,


     GET_MRP_PRODUCT_LOADING,
     GET_MRP_PRODUCT_SUCCESS,
     GET_MRP_PRODUCT_FAILED
} from '../actions/types'

const INITIAL_STATE = {

     MRP_loading: false,
     MRPList: [],
     MRP_Product_loading: false,
     MRP_ProductList: [],
}

export default function (state = INITIAL_STATE, action) {
     switch (action.type) {

          case GET_MRP_LOADING:
               return { ...state, MRP_loading: true };
          case GET_MRP_SUCCESS:
               return {
                    ...state,
                    MRP_loading: false,
                    MRPList: action.payload,
               };
          case GET_MRP_FAILED:
               return { ...state, MRP_loading: false };

          case GET_MRP_PRODUCT_LOADING:
               return {
                    ...state, MRP_Product_loading: true,
                    MRP_ProductList: [],
               };
          case GET_MRP_PRODUCT_SUCCESS:
               return {
                    ...state,
                    MRP_Product_loading: false,
                    MRP_ProductList: action.payload,
               };
          case GET_MRP_PRODUCT_FAILED:
               return {
                    ...state, MRP_Product_loading: false,
                    MRP_ProductList: [],
               };


          default:
               return state;
     }
}