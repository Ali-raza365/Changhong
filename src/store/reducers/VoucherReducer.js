import { light, dark } from '../../common/theme';
import {
    BARCODE_LOADING,
    BARCODE_FAILED,
    BARCODE_SUCCESS,
    BARCODE_IMAGE_UPLOAD_LOADING,
    BARCODE_IMAGE_UPLOAD_SUCCESS,
    BARCODE_IMAGE_UPLOAD_FAILED,
    ADD_VOUCHER_LOADING,
    ADD_VOUCHER_FAILED,
    ADD_VOUCHER_SUCCESS,

    // get all vouchers
    ALL_VOUCHERS_LOADING,
    ALL_VOUCHERS_SUCCESS,
    ALL_VOUCHERS_FAILED,
    BARCODE_DETAILS_LOADING,
    BARCODE_DETAILS_SUCCESS,
    BARCODE_DETAILS_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
    barcode_loading: false,
    barcode_Details_loading: false,
    barcodeData: null,
    barcode_image_upload_loading: false,
    isActive: false,
    barcode_details: null,
    add_voucher_loading: false,
    all_vouchers_loading: false,
    vouchers: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case BARCODE_LOADING:
            return {
                ...state,
                barcodeData: null,
                barcode_loading: true,
            };
        case BARCODE_SUCCESS:
            return {
                ...state,
                barcode_loading: false,
                barcodeData: action.payload,
            };
        case BARCODE_FAILED:
            return {
                ...state,
                barcodeData: null,
                barcode_loading: false,
            };

        case BARCODE_IMAGE_UPLOAD_LOADING:
            return {
                ...state,
                barcodeData: null,
                barcode_image_upload_loading: true,
            };
        case BARCODE_IMAGE_UPLOAD_SUCCESS:
            return {
                ...state,
                barcodeData: null,
                barcode_image_upload_loading: false,
            };
        case BARCODE_IMAGE_UPLOAD_FAILED:
            return {
                ...state,
                barcodeData: null,
                barcode_image_upload_loading: false,
            };

        case BARCODE_DETAILS_LOADING:
            return {
                ...state,
                barcode_Details_loading: true,
                barcode_details: null,
            };
        case BARCODE_DETAILS_SUCCESS:
            return {
                ...state,
                barcode_Details_loading: false,
                barcode_details: action.payload,
            };
        case BARCODE_DETAILS_FAILED:
            return {
                ...state,
                barcode_Details_loading: false,
                barcode_details: null,
            };

        case ADD_VOUCHER_LOADING:
            return { ...state, add_voucher_loading: true };
        case ADD_VOUCHER_SUCCESS:
            return {
                ...state,
                add_voucher_loading: false,
            };
        case ADD_VOUCHER_FAILED:
            return { ...state, add_voucher_loading: false };

        case ALL_VOUCHERS_LOADING:
            return { ...state, all_vouchers_loading: true };
        case ALL_VOUCHERS_SUCCESS:
            return {
                ...state,
                all_vouchers_loading: false,
                vouchers: action.payload,
            };
        case ALL_VOUCHERS_FAILED:
            return { ...state, all_vouchers_loading: false };

        default:
            return state;
    }
}
