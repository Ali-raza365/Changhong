import { light, dark } from "../../common/theme";
import {
     FAQ_LOADING,
     FAQ_SUCCESS,
     FAQ_FAILED,

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


} from '../actions/types'

const INITIAL_STATE = {

     Faq_loading: false,
     FAQ: [],
     qna_loading: false,
     QNA: [],
     course_loading: false,
     Courses: [],
     fav_course_loading: false,
     FavCourses: [],
     finished_course_loading: false,
     FinishedCourses: [],
     add_loading: false,


}

export default function (state = INITIAL_STATE, action) {
     switch (action.type) {

          case FAQ_LOADING:
               return { ...state, Faq_loading: true };
          case FAQ_SUCCESS:
               return {
                    ...state,
                    Faq_loading: false,
                    FAQ: action.payload,
               };
          case FAQ_FAILED:
               return { ...state, Faq_loading: false };

          case QUESTION_LOADING:
               return { ...state, qna_loading: true };
          case QUESTION_SUCCESS:
               return {
                    ...state,
                    qna_loading: false,
                    QNA: action.payload,
               };
          case QUESTION_FAILED:
               return { ...state, qna_loading: false };


          case GET_COURSES_LOADING:
               return { ...state, course_loading: true };
          case GET_COURSES_SUCCESS:
               return {
                    ...state,
                    course_loading: false,
                    Courses: action.payload,
               };
          case GET_COURSES_FAILED:
               return { ...state, course_loading: false };

          case GET_FAVORITE_LOADING:
               return { ...state, fav_course_loading: true };
          case GET_FAVORITE_SUCCESS:
               return {
                    ...state,
                    fav_course_loading: false,
                    FavCourses: action.payload,
               };
          case GET_FAVORITE_FAILED:
               return { ...state, fav_course_loading: false };

          case GET_FINISHED_LOADING:
               return { ...state, finished_course_loading: true };
          case GET_FINISHED_SUCCESS:
               return {
                    ...state,
                    finished_course_loading: false,
                    FinishedCourses: action.payload,
               };
          case GET_FINISHED_FAILED:
               return { ...state, finished_course_loading: false };





          case ADD_FAVORITE_LOADING:
               return { ...state, add_loading: true };
          case ADD_FAVORITE_SUCCESS:
               return {
                    ...state,
                    add_loading: false,
               };
          case ADD_FAVORITE_FAILED:
               return { ...state, add_loading: false };


          default:
               return state;
     }
}