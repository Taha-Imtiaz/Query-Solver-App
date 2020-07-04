import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "./userConstants";
import { auth, serverTimestamp, firestore, googleAuthProvider } from "../../Firebase/Firebase";


export var setCurrentUser = (userObj) =>({
    type : SET_CURRENT_USER,
    payload : {
        userObj : userObj
    }
})
export var signup = (userObj) => {
    var {fullname, email, password} =userObj
    return async (dispatch) => {
        try {
    //create user with firebase auth.
     var createdUser = await auth.createUserWithEmailAndPassword(email,password);
     console.log(createdUser)
    //save user info in database too.
        var userObjForFirestore = {
            email : email,
            fullname : fullname,
            createdAt : serverTimestamp()
        }    
        console.log(userObjForFirestore)
        await firestore.collection("users").doc(createdUser.user.uid).set(userObjForFirestore);
        //update user auth profile
        await createdUser.user.updateProfile({
            displayName : fullname
        })
      
        //update your app's state in redux store 
        //this is managed by onAuthStateChanged listener

       
        } catch (error) {
            console.log(error)
        }
    }
}
//sign in action
export var signin = (userObj) => {
    return async (dispatch) =>{

        var {email,password} = userObj

        try {
           // sign in user with firebase auth.
         await auth.signInWithEmailAndPassword(email , password) 
    
        console.log("Successfully sign in")

       //update your app's state in redux store 
        //this is managed by onAuthStateChanged listener


        } catch (error) {
            console.log(error)
        }
    }
}

export var googleLogin = () => {
    return async (dispatch) => {
       try {
        var {user : {displayName,email,uid} , additionalUserInfo : {isNewUser} } = await auth.signInWithPopup(googleAuthProvider)
        console.log(isNewUser)
        if(isNewUser) {
            //send user data to firestore
           var userObjForFirestore = {
               fullname :displayName,
               email : email,
               createdAt : serverTimestamp()
           }
           await firestore.collection("users").doc(uid).set(userObjForFirestore)

         //update your app's state in redux store 
        //this is managed by onAuthStateChanged listener

       }

       } catch (error) {
           console.log(error)
       }
    }
}
 //REMOVE USER FROM APP(CHANGE APP STATE)
export var removeCurrentUser = () => {
    return async (dispatch) => {
        dispatch({
            type:REMOVE_CURRENT_USER
        })
    }
}

export var signout = () => {
    return async (dispatch) => {
    try {
        // Remove user from firebase database
        await auth.signOut()
    } catch (error) {
        console.log(error)
    }
    }
}