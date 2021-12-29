import {

    FAQ_LOADING,
    FAQ_SUCCESS,
    FAQ_FAILED,

    //Question 
    QUESTION_LOADING,
    QUESTION_SUCCESS,
    QUESTION_FAILED,

    GET_COURSES_LOADING,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAILED,

    ADD_FAVORITE_LOADING,
    ADD_FAVORITE_SUCCESS,
    ADD_FAVORITE_FAILED,


    GET_FAVORITE_LOADING,
    GET_FAVORITE_SUCCESS,
    GET_FAVORITE_FAILED,

    GET_FINISHED_LOADING,
    GET_FINISHED_SUCCESS,
    GET_FINISHED_FAILED

} from './types';
import preferences from '../../common/preferences';
import * as ApiServices from '../../services/index';
import { _showErrorMessage } from '../../utils/Errorhandler'


export const _GETFAQ = () => {
    return async dispatch => {
        console.log("_GETFAQ Actions")
        dispatch({
            type: FAQ_LOADING,
        });
        ApiServices._GetFaqApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: FAQ_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: FAQ_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: FAQ_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: FAQ_FAILED,
                });
            });
    }
}

export const _GETQuestion = () => {
    return async dispatch => {
        console.log("_GETQuestion Actions")
        dispatch({
            type: QUESTION_LOADING,
        });
        ApiServices._GetQNAApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: QUESTION_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: QUESTION_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: QUESTION_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: QUESTION_FAILED,
                });
            });
    }
}




export const _GETAllCourses = () => {
    return async dispatch => {
        console.log("_GETAllCourses Actions")
        dispatch({
            type: GET_COURSES_LOADING,
        });
        ApiServices._GetCoursesApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_COURSES_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_COURSES_SUCCESS,
                            payload: data.success.data
                        });

                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_COURSES_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_COURSES_FAILED,
                });
            });
    }
}

export const _AddFavoriteCourse = (id) => {
    return async dispatch => {
        console.log("_AddFavoriteCourse Actions")
        dispatch({
            type: ADD_FAVORITE_LOADING,
        });
        ApiServices._AddFavoriteCourseApi(id)
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: ADD_FAVORITE_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: ADD_FAVORITE_SUCCESS,
                            payload: data.success.data
                        });
                        dispatch(_GetFavoriteCourse())
                        // dispatch(_GETAllCourses)
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: ADD_FAVORITE_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: ADD_FAVORITE_FAILED,
                });
            });
    }
}


export const _AddIntoFinished = (id) => {
    return async dispatch => {
        console.log("_AddIntoFinished Actions")
        dispatch({
            type: ADD_FAVORITE_LOADING,
        });
        ApiServices.__AddIntoFinishedApi(id)
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: ADD_FAVORITE_FAILED,
                        });
                    } else if (data.success) {
                        console.log(data.success.message)
                        if (data.success.message == "Course Already Finished") {
                            dispatch({
                                type: ADD_FAVORITE_SUCCESS,
                                payload: data.success.data
                            });
                        } else {
                            alert(data.success.message)
                            dispatch({
                                type: ADD_FAVORITE_SUCCESS,
                                payload: data.success.data
                            });
                            // dispatch(_GetFavoriteCourse())
                        }
                        dispatch(_GETAllCourses())
                        dispatch(_GetFinishedCourse())
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: ADD_FAVORITE_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: ADD_FAVORITE_FAILED,
                });
            });
    }
}



export const _GetFavoriteCourse = () => {
    return async dispatch => {
        console.log("_GetFavoriteCourse Actions")
        dispatch({
            type: GET_FAVORITE_LOADING,
        });
        ApiServices._GetFavoriteCourseApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_FAVORITE_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_FAVORITE_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_FAVORITE_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_FAVORITE_FAILED,
                });
            });
    }
}


export const _GetFinishedCourse = () => {
    return async dispatch => {
        console.log("_GetFinishedCourse Actions")
        dispatch({
            type: GET_FINISHED_LOADING,
        });
        ApiServices._GetFinishedCourseApi()
            .then((data) => {
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        console.log(data, "_Error")
                        _showErrorMessage(Object.values(data.errors)[0])
                        dispatch({
                            type: GET_FINISHED_FAILED,
                        });
                    } else if (data.success) {
                        dispatch({
                            type: GET_FINISHED_SUCCESS,
                            payload: data.success.data
                        });
                    }
                } else {
                    console.log(data, "_Empty")
                    // _showErrorMessage()
                    dispatch({
                        type: GET_FINISHED_FAILED,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _showErrorMessage(error.message)
                dispatch({
                    type: GET_FINISHED_FAILED,
                });
            });
    }
}