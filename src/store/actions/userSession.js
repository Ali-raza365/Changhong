//auth actions...
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from './types';
import preferences from '../../common/preferences';
import * as ApiServices from '../../services/index';
import { _showErrorMessage } from '../../utils/Errorhandler'


export const _Login = (email, password, navigation) => {
    return async dispatch => {
        console.log("_Login Actions")
        dispatch({
            type: LOGIN_LOADING,
        });
        ApiServices._LOGIN_API(email, password)
            .then((response) => {
                let data = response.data
                console.log(data, "_")
                if (data) {
                    if (data.errors) {
                        _showErrorMessage(data.errors.email)
                    } else {
                        preferences.setAuthSession({ token: data.token, type: data.user.is_vendor, user: data.user }).then(() => {
                            dispatch({
                                type: LOGIN_SUCCESS,
                                payload: data,
                            })
                            if (data.user.is_vendor == "1") {
                                navigation.reset({
                                    index: 0,
                                    routes: [{
                                        name: "bottomTab"
                                    }]
                                })
                            } else if (data.user.is_vendor == "2") {
                                navigation.reset({
                                    index: 0,
                                    routes: [{
                                        name: "TrainerTabs"
                                    }]
                                })

                            } else if (data.user.is_vendor == "3") {
                                navigation.reset({
                                    index: 0,
                                    routes: [{
                                        name: "DealerBottomTab"
                                    }]
                                })
                            }
                            else if (data.user.is_vendor == "4") {
                                navigation.reset({
                                    index: 0,
                                    routes: [{
                                        name: "DisplayBottomTab"
                                    }]
                                })
                            }
                        }).catch((err) => {
                            _showErrorMessage()
                            dispatch({
                                type: LOGIN_FAILED,
                            });
                        })
                    }
                } else {
                    _showErrorMessage()
                    dispatch({
                        type: LOGIN_FAILED,
                    });
                }
            })
            .catch((error) => {
                // console.log(error);
                console.log(error.response.data.message, "login error");
                dispatch({
                    type: LOGIN_FAILED,
                });
                if (error.response.data.message == "Your Account Is Pending For Approval Contact To Admin") {
                    _showErrorMessage(Object.values(error.response.data)[0]);
                } else {
                    _showErrorMessage("email or password is incorrect")
                }
            });
    }
}

export const _Register = (details, navigation) => {
    return async dispatch => {
        console.log("_Register Actions")
        dispatch({
            type: REGISTER_LOADING,
        });
        console.log(details)
        ApiServices._REGISTER_API(details)
            .then((res) => {
                let data = res.data
                if (data) {
                    if (data.errors) {
                        console.log(data, "errorsuuhu")
                        _showErrorMessage(data.errors.email)
                        dispatch({
                            type: REGISTER_FAILED,
                        })
                    } else {
                        alert("You Have Successfully Registered Wait For Approval Of Admin")
                        // preferences.setAuthSession({ token: data.token }).then(() => {
                        dispatch({
                            type: REGISTER_SUCCESS,
                            payload: {},
                        })
                        navigation.navigate('Login');
                        // }).catch((err) => {
                        //      console.log(err)
                        //      dispatch({
                        //           type: REGISTER_FAILED,
                        //      });
                        // // })
                    }
                } else {
                    console.log(data)
                    _showErrorMessage()
                    dispatch({
                        type: REGISTER_FAILED,
                    });
                }
            })
            .catch((error) => {
                // console.log(error);
                alert('Error : Something Went Wrong')
                console.log(error,);
                dispatch({
                    type: REGISTER_FAILED,
                });

            });
    }
}