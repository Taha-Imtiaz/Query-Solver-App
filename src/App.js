import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Questions from "./Pages/Questions/Questions";
import QuestionViewPage from "./Pages/QuestionViewPage/QuestionViewPage";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Navbar from "./Components/Navbar/Navbar";
import { auth, firestore } from "./Firebase/Firebase";
import LoginModal from "./Pages/LoginModal/LoginModal";
import SignupModal from "./Pages/SignupModal/SignupModal";
import QuestionAdderForm from "./Pages/QuestionAdderForm/QuestionAdderForm";
import { connect } from "react-redux";
import { setCurrentUser, removeCurrentUser } from "./Redux/user/userActions";

class App extends Component {
  componentDidMount() {
    //onAuthStateChanged triggers when auth state changes
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          var { uid } = user;
          if (uid) {
            var userSnap = await firestore.collection("users").doc(uid).get();
            if (userSnap.exists) {
              var userData = userSnap.data();

              //update app state
              var userObj = {
                fullname: userData.fullname,
                email: userData.email,
                uid: uid,
              };
              console.log(userObj);
              this.props.setCurrentUser(userObj);
            }
          }
        } else {
          this.props.removeCurrentUser();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
  render() {
    return (
      <div className="app-container">
        <div className="navbar">
          <Navbar />
        </div>

        <div className="app-view">
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route
              path="/dashboard/questions"
              component={Questions}
              exact
            ></Route>
            <Route
              path="/dashboard/questions/:questionId"
              component={QuestionViewPage}
            ></Route>
            <Route path="/userProfile/:uid" component={UserProfile}></Route>
            <Route path="/login" component={LoginModal}></Route>
            <Route path="/signup" component={SignupModal}></Route>
            <Route
              path="/questionadderform"
              component={QuestionAdderForm}
            ></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
var actions = {
  setCurrentUser,
  removeCurrentUser,
};
export default connect(null, actions)(App);
