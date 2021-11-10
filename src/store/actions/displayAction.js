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

} from './types';
import preferences from '../../common/preferences';
import * as ApiServices from '../../services/index';
import { _showErrorMessage } from '../../utils/Errorhandler'




export const _GetDisplay = () => {
    return async dispatch => {
        console.log("_GetDisplay Actions")
        dispatch({
            type: GET_DISPLAY_LOADING,
        });
        ApiServices._GetDisplayApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_DISPLAY_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_DISPLAY_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_DISPLAY_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_DISPLAY_FAILED,
                });
            });
    }
}



export const _GetBrandList = () => {
    return async dispatch => {
        console.log("_GetBrandList Actions")
        dispatch({
            type: GET_DISPLAY_BRANDLIST_LOADING,
        });
        ApiServices._GetDisplayBrandListApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_DISPLAY_BRANDLIST_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_DISPLAY_BRANDLIST_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_DISPLAY_BRANDLIST_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_DISPLAY_BRANDLIST_FAILED,
                });
            });
    }
}



export const _GetCompetitorList = () => {
    return async dispatch => {
        console.log("_GetCompetitorList Actions")
        dispatch({
            type: GET_DISPLAY_COMPETITORS_LOADING,
        });
        ApiServices._GetDisplayCompetitorListApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_DISPLAY_COMPETITORS_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_DISPLAY_COMPETITORS_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_DISPLAY_COMPETITORS_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_DISPLAY_COMPETITORS_FAILED,
                });
            });
    }
}



export const _GetShops = () => {
    return async dispatch => {
        console.log("_GetShops Actions")
        dispatch({
            type: GET_SHOPS_LOADING,
        });
        ApiServices._GetShopsApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_SHOPS_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_SHOPS_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_SHOPS_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_SHOPS_FAILED,
                });
            });
    }
}

export const _GetDisplayGallery = (type) => {
    return async dispatch => {
        console.log("_GetDisplayGallery Actions")
        dispatch({
            type: GET_GALLERY_LOADING,
        });
        ApiServices._GetDisplayGalleryApi(type)
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_GALLERY_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_GALLERY_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_GALLERY_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_GALLERY_FAILED,
                });
            });
    }
}
