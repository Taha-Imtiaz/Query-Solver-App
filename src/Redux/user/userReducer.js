import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "./userConstants"

var initialState = {
    currentUser : null
}
var userReducer = (state = initialState,actions)=>{
    var {type ,payload} = actions
    switch (type) {
       case SET_CURRENT_USER:
           return {...state , currentUser : payload.userObj}
    
           case REMOVE_CURRENT_USER:
            return {...state, currentUser: null}

        default:
          return state
    }
}
export default userReducer