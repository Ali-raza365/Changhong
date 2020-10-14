import { light, dark } from "../../common/theme";
import {
    SET_APP_THEME,
    SET_APP_LANGUAGE
} from '../actions/types'
import { AvailableLanguages } from '../../language';

const INITIAL_STATE = {
    theme: dark,
    language: AvailableLanguages.en
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_APP_THEME:
            return { ...state, theme: action.payload === 'light' ? light : dark };
        case SET_APP_LANGUAGE:
            return { ...state, language: action.payload };
        default:
            return state;
    }
}