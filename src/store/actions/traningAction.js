import {
    GET_TRAINING_LIST_LOADING,
    GET_TRAINING_LIST_SUCCESS,
    GET_TRAINING_LIST_FAILED,

    GET_TRAINING_HISTORY_LOADING,
    GET_TRAINING_HISTORY_SUCCESS,
    GET_TRAINING_HISTORY_FAILED,



    START_TRAINING_LOADING,
    START_TRAINING_SUCCESS,
    START_TRAINING_FAILED,


    END_TRAINING_LOADING,
    END_TRAINING_SUCCESS,
    END_TRAINING_FAILED
} from './types';
import preferences from '../../common/preferences';
import * as ApiServices from '../../services/index';
import { _showErrorMessage } from '../../utils/Errorhandler'




export const _GetTrainingList = () => {
    return async dispatch => {
        console.log("_GetTrainingList Actions")
        dispatch({
            type: GET_TRAINING_LIST_LOADING,
        });
        ApiServices._GetTrainingListApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.error)[0])
                        dispatch({
                            type: GET_TRAINING_LIST_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_TRAINING_LIST_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_TRAINING_LIST_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error, "ccccc")
                dispatch({
                    type: GET_TRAINING_LIST_FAILED,
                });
                _showErrorMessage(error.response.data.error.message)
            });
    }
}


export const _GetTrainingHistory = () => {
    return async dispatch => {
        console.log("_GetTrainingHistory Actions")
        dispatch({
            type: GET_TRAINING_HISTORY_LOADING,
        });
        ApiServices._GetTrainingHistoryApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_TRAINING_HISTORY_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_TRAINING_HISTORY_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_TRAINING_HISTORY_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: GET_TRAINING_HISTORY_FAILED,
                });
                _showErrorMessage(error.response.data.error.message)

            });
    }
}


export const _StartTraining = (details, navigation) => {
    return async dispatch => {
        console.log("_StartTraining Actions")
        dispatch({
            type: START_TRAINING_LOADING,
        });
        ApiServices._StartTrainingApi(details)
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: START_TRAINING_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: START_TRAINING_SUCCESS,
                        });
                        navigation.navigate('Timer', { start_time: null, start_date: null, id: details.training_id });
                        dispatch(_GetTrainingList())
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: START_TRAINING_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error, "_StartTraining")
                dispatch({
                    type: START_TRAINING_FAILED,
                });
                _showErrorMessage(Object.values(error.response.data.error)[1])
            });
    }
}


export const _EndTraining = (id, navigation) => {
    return async dispatch => {
        console.log(id, "_EndTraining Actions")
        dispatch({
            type: END_TRAINING_LOADING,
        });
        ApiServices._EndTrainingApi(id)
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: END_TRAINING_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: END_TRAINING_SUCCESS,
                        });
                        dispatch(_GetTrainingList())
                        navigation.navigate('TrainingConfirmation', { tranID: id });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: END_TRAINING_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: END_TRAINING_FAILED,
                });
                _showErrorMessage()
            });
    }
}
