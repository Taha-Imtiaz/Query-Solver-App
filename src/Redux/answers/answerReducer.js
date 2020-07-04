import { ADD_ANSWER, FETCH_ANSWER, SET_SIGNED_USER_ANSWERS } from "./answerConstants";

var initialState = []

var answerReducer = (state = initialState , actions) => {
    var {type, payload} = actions;
    switch (type) {
        case ADD_ANSWER:
        return [{...payload.answerAdded}, ...state]

        case FETCH_ANSWER:
        return [...payload.answers]

        case SET_SIGNED_USER_ANSWERS:
            return [...payload.signedUserAnswers]

        default:
            return state
    }
}
export default answerReducer