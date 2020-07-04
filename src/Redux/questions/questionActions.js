import { firestore } from "../../Firebase/Firebase";
import {
  ADD_QUESTION,
  SET_QUESTION,
  SET_SIGNED_USER_QUESTIONS,
} from "./questionConstants";

export var addQuestion = (QuestionObj, navigate) => {
  return async (dispatch) => {
    try {
      //create question in firebase database
      var addQuestion = await firestore
        .collection("questions")
        .add(QuestionObj);
      console.log({ ...QuestionObj, questionId: addQuestion.id });
      //update app's state
      dispatch({
        type: ADD_QUESTION,
        payload: {
          questionAdded: {
            ...QuestionObj,
            questionId: addQuestion.id,
          },
        },
      });
      navigate();
    } catch (error) {
      console.log(error);
    }
  };
};

export var fetchQuestions = () => {
  return async (dispatch) => {
    try {
      var questions = [];
      //fetch all question collection from firestore
      var questionSnap = await firestore
        .collection("questions")
        .orderBy("questionTitle", "asc")
        .get();

      questionSnap.forEach((doc) => {
        questions.push({ ...doc.data(), questionId: doc.id });
      });

      //update your app's state
      dispatch({
        type: SET_QUESTION,
        payload: {
          questions: questions,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export var fetchSignedUserQuestions = (uid) => {
  return async (dispatch) => {
    try {
        console.log(uid)
      var signedUserQuestions = [];
      //get user data from firestore
      var signedUserSnap = await firestore
        .collection("questions")
        .where("questionPostedBy", "==", uid)
        .orderBy("questionTitle", "asc")
        .get();
        // console.log(signedUserSnap)
      signedUserSnap.forEach((doc) => {
        
        signedUserQuestions.push({...doc.data(), questionId: doc.id });
        
      });
      //update app's state
      dispatch({
        type: SET_SIGNED_USER_QUESTIONS,
        payload: {
          signedUserQuestions: signedUserQuestions,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
