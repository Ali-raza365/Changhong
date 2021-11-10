import { light, dark } from "../../common/theme";
import {
    GET_DISPLAY_LOADING,
    GET_DISPLAY_SUCCESS,
    GET_DISPLAY_FAILED,


    GET_DISPLAY_BRANDLIST_LOADING,
    GET_DISPLAY_BRANDLIST_SUCCESS,
    GET_DISPLAY_BRANDLIST_FAILED,


    GET_DISPLAY_COMPETITORS_LOADING,
    GET_DISPLAY_COMPETITORS_SUCCESS,
    GET_DISPLAY_COMPETITORS_FAILED,



    GET_SHOPS_LOADING,
    GET_SHOPS_SUCCESS,
    GET_SHOPS_FAILED,

    GET_GALLERY_LOADING,
    GET_GALLERY_SUCCESS,
    GET_GALLERY_FAILED,


} from '../actions/types'

const INITIAL_STATE = {

    display_loading: false,
    displays: [],
    display_brand_loading: false,
    displaybrand: [],
    display_competitors_loading: false,
    displaycompetitors: [],

    shop_loading: false,
    shops: [],

    gallery_loading: false,
    displayGallery: [],
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_DISPLAY_LOADING:
            return { ...state, display_loading: true };
        case GET_DISPLAY_SUCCESS:
            return {
                ...state,
                display_loading: false,
                displays: action.payload,
            };
        case GET_DISPLAY_FAILED:
            return { ...state, display_loading: false };


        case GET_DISPLAY_BRANDLIST_LOADING:
            return { ...state, display_brand_loading: true };
        case GET_DISPLAY_BRANDLIST_SUCCESS:
            return {
                ...state,
                display_brand_loading: false,
                displaybrand: action.payload,
            };
        case GET_DISPLAY_BRANDLIST_FAILED:
            return { ...state, display_brand_loading: false };



        case GET_DISPLAY_COMPETITORS_LOADING:
            return { ...state, display_competitors_loading: true };
        case GET_DISPLAY_COMPETITORS_SUCCESS:
            return {
                ...state,
                display_competitors_loading: false,
                displaycompetitors: action.payload,
            };
        case GET_DISPLAY_COMPETITORS_FAILED:
            return { ...state, display_competitors_loading: false };

        case GET_SHOPS_LOADING:
            return { ...state, shop_loading: true };
        case GET_SHOPS_SUCCESS:
            return {
                ...state,
                shop_loading: false,
                shops: action.payload,
            };
        case GET_SHOPS_FAILED:
            return { ...state, gallery_loading: false };


        case GET_GALLERY_LOADING:
            return { ...state, gallery_loading: true };
        case GET_GALLERY_SUCCESS:
            return {
                ...state,
                gallery_loading: false,
                displayGallery: action.payload,
            };
        case GET_GALLERY_FAILED:
            return { ...state, gallery_loading: false };


        default:
            return state;
    }
}