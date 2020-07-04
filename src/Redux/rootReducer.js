import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import questionReducer from './questions/questionReducer'
import answerReducer from './answers/answerReducer'

var rootReducer = combineReducers({
    user : userReducer,
    questions : questionReducer,
    answers : answerReducer
})
export default rootReducer