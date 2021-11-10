import {
    BARCODE_LOADING,
    BARCODE_SUCCESS,
    BARCODE_FAILED,

    BARCODE_IMAGE_UPLOAD_LOADING,
    BARCODE_IMAGE_UPLOAD_SUCCESS,
    BARCODE_IMAGE_UPLOAD_FAILED,

    ADD_VOUCHER_LOADING,
    ADD_VOUCHER_SUCCESS,
    ADD_VOUCHER_FAILED,

    // get all vouchers
    ALL_VOUCHERS_LOADING,
    ALL_VOUCHERS_SUCCESS,
    ALL_VOUCHERS_FAILED,

    BARCODE_DETAILS_LOADING,
    BARCODE_DETAILS_SUCCESS,
    BARCODE_DETAILS_FAILED,
} from './types';
import preferences from '../../common/preferences';
import * as ApiServices from '../../services/index';
import { _showErrorMessage } from '../../utils/Errorhandler'

export const _BarcodeScan = (code, navigation) => {
    return async dispatch => {
        console.log("_BarcodeScan Actions")
        dispatch({
            type: BARCODE_LOADING,
        });
        ApiServices._BarcodeScanApi(code)
            .then((response) => {
                let data = response.data
                console.log(data, "_")
                if (data) {
                    alert("Barcode Found Success")
                    // navigation.goBack()
                    dispatch({
                        type: BARCODE_SUCCESS,
                        payload: data.success.voucher_id
                    });
                    navigation.navigate("BarCodeSuccess")
                } else {
                    _showErrorMessage()
                    dispatch({
                        type: BARCODE_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage("Barcode Not Found Or Already Used")
                dispatch({
                    type: BARCODE_FAILED,
                });
            });
    }
}

export const _BarcodeScanImageUpload = (detail, navigation) => {
    return async dispatch => {
        console.log("_BarcodeScanImageUpload Actions")
        dispatch({
            type: BARCODE_IMAGE_UPLOAD_LOADING,
        });
        ApiServices._BarcodeScanImageUploadApi(detail)
            .then((response) => {
                let data = response.data
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(Object.values(data.errors)[0])
                        dispatch({
                            type: BARCODE_IMAGE_UPLOAD_FAILED,
                        });
                    } else {
                        dispatch({
                            type: BARCODE_IMAGE_UPLOAD_SUCCESS,
                        });
                        alert("image uploaded successfully")
                        navigation.goBack()
                    }

                } else {
                    _showErrorMessage()
                    dispatch({
                        type: BARCODE_IMAGE_UPLOAD_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage()
                dispatch({
                    type: BARCODE_IMAGE_UPLOAD_FAILED,
                });
            });
    }
}


export const _GetBarcodeDetail = (code, navigation) => {
    return async dispatch => {
        console.log("_GetBarcodeDetail Actions")
        dispatch({
            type: BARCODE_DETAILS_LOADING,
        });
        ApiServices._BarcodeDetailApi(code)
            .then((response) => {
                let data = response.data
                console.log(data, "_")
                if (data) {
                    alert("Barcode Found Success")
                    dispatch({
                        type: BARCODE_DETAILS_SUCCESS,
                        payload: data.success.data,
                    });
                    // navigation.navigate("Manually")
                } else {
                    _showErrorMessage()
                    dispatch({
                        type: BARCODE_DETAILS_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage("Barcode Not Found Or Already Used")
                dispatch({
                    type: BARCODE_DETAILS_FAILED,
                });
            });
    }
}


export const AddVoucher = (detail, navigation) => {
    return async dispatch => {
        dispatch({
            type: ADD_VOUCHER_LOADING,
        });
        ApiServices._AddVoucherManuallyApi(detail)
            .then((response) => {
                let data = response.data
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: ADD_VOUCHER_FAILED,
                        });
                    } else {
                        alert("Voucher Add Successfully")
                        dispatch({
                            type: ADD_VOUCHER_SUCCESS,
                        });
                        navigation.goBack()
                    }
                } else {
                    _showErrorMessage()
                    dispatch({
                        type: ADD_VOUCHER_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage("Barcode Not Found Or Already Used")
                dispatch({
                    type: ADD_VOUCHER_FAILED,
                });
            });
    }
}

export const AllVoucher = () => {
    return async dispatch => {
        console.log("AllVoucher Actions")
        dispatch({
            type: ALL_VOUCHERS_LOADING,
        });
        ApiServices._GetAllVouchersApi()
            .then((response) => {
                let data = response.data
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: ALL_VOUCHERS_FAILED,
                        });
                    } else {
                        dispatch({
                            type: ALL_VOUCHERS_SUCCESS,
                            payload: data
                        });

                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: ALL_VOUCHERS_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: ALL_VOUCHERS_FAILED,
                });
            });
    }
}


