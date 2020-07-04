import { firestore } from "../../Firebase/Firebase";
import { ADD_ANSWER, FETCH_ANSWER, SET_SIGNED_USER_ANSWERS } from "./answerConstants";

export var addAnswer = (answerObj) => {
  return async (dispatch) => {
    try {
      //add answer to firestore
      var addAnswer = await firestore.collection("answers").add(answerObj);

      //update app's state
      dispatch({
        type: ADD_ANSWER,
        payload: {
          answerAdded: {
            ...answerObj,
            answerId: addAnswer.id,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export var fetchAnswer = (questionId) => {
  return async (dispatch) => {
    try {
      var answers = [];
      var answerSnap = await firestore
        .collection("answers")
        .where("answerTotheQuestion", "==", questionId)
        .orderBy("answerPostedByName", "asc")
        .get();
      // console.log(answerSnap)
      //getting data from answerSnap
      answerSnap.forEach((doc) => {
        // console.log(doc.data())
        answers.push({ ...doc.data(), answerId: doc.id });
      });

      //update your app's state
      dispatch({
        type: FETCH_ANSWER,
        payload: {
          answers: answers,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export var fetchSignedUserAnswers = (uid) => {
  return async (dispatch) => {
    try {
      var signedUserAnswers = [];
      
      //fetch data from firebase
      var signedUserSnap = await firestore
        .collection("answers")
        .where("answerPostedBy", "==", uid)
        .orderBy("answerPostedByName", "asc")
        .get();
        signedUserSnap.forEach((doc) => {
          signedUserAnswers.push({...doc.data(), answerId:doc.id})
        })
        //update app's state
        dispatch({
          type :SET_SIGNED_USER_ANSWERS,
          payload:{
            signedUserAnswers : signedUserAnswers
          }
        })
    } catch (error) {
      console.log(error);
    }
  };
};
