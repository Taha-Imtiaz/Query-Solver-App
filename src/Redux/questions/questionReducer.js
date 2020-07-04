import { ADD_QUESTION, SET_QUESTION, SET_SIGNED_USER_QUESTIONS } from "./questionConstants";

var initialState = [];

var questionReducer = (state = initialState , action) => {
    var {type , payload} = action;

    switch (type) {
       
            case ADD_QUESTION:
                return [{...payload.questionAdded}, ...state]
          
    case SET_QUESTION:
        return [...payload.questions]

        case SET_SIGNED_USER_QUESTIONS:
            return [...payload.signedUserQuestions]

        default:
            return state
    }
}
export default questionReducer
