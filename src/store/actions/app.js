//auth actions...
import {
    SET_APP_THEME,
    SET_APP_LANGUAGE
} from './types';

import preferences from '../../common/preferences'
import {setI18nConfig, translate, AvailableLanguages} from '../../language';

export const setTheme = (theme = 'light') => {
    if (theme === 'light' || theme === 'dark') {
        return async dispatch => {
            dispatch({
                type: SET_APP_THEME,
                payload: theme
            })
        }
    }
}

export const setLanguage = (languageTag) => {
  preferences.setLocalization(languageTag);
  setI18nConfig(languageTag);

  return async dispatch => {
    dispatch({
        type: SET_APP_LANGUAGE,
        payload: AvailableLanguages[languageTag] || AvailableLanguages['en']
    })
  }
}
