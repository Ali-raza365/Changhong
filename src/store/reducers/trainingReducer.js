import { light, dark } from "../../common/theme";
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


} from '../actions/types'

const INITIAL_STATE = {

    traning_loading: false,
    traningList: [],
    traning_history_loading: false,
    traning_Time_loading: false,
    traningHistory: [],
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_TRAINING_LIST_LOADING:
            return { ...state, traning_loading: true };
        case GET_TRAINING_LIST_SUCCESS:
            return {
                ...state,
                traning_loading: false,
                traningList: action.payload,
            };
        case GET_TRAINING_LIST_FAILED:
            console.log('Trying to load training list')
            return { ...state, traning_loading: false };




        case GET_TRAINING_HISTORY_LOADING:
            return { ...state, traning_history_loading: true };
        case GET_TRAINING_HISTORY_SUCCESS:
            return {
                ...state,
                traning_history_loading: false,
                traningHistory: action.payload,
            };
        case GET_TRAINING_HISTORY_FAILED:
            return { ...state, traning_history_loading: false };


        case START_TRAINING_LOADING:
            return { ...state, traning_Time_loading: true };
        case START_TRAINING_SUCCESS:
            return {
                ...state,
                traning_Time_loading: false,
            };
        case START_TRAINING_FAILED:
            return { ...state, traning_Time_loading: false };

        case END_TRAINING_LOADING:
            return { ...state, traning_Time_loading: true };
        case END_TRAINING_SUCCESS:
            return {
                ...state,
                traning_Time_loading: false,
            };
        case END_TRAINING_FAILED:
            return { ...state, traning_Time_loading: false };

        default:
            return state;
    }
}