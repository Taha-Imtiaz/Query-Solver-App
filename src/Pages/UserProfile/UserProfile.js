import React,{Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UserInfo from "../../Components/UserInfo/UserInfo";
import "./UserProfile.css";
import { fetchSignedUserQuestions } from "../../Redux/questions/questionActions";
import QuestionTitleList from "../../Components/QuestionTitleList/QuestionTitleList";
import { fetchSignedUserAnswers } from "../../Redux/answers/answerActions";
import AnswerList from "../../Components/AnswerList/AnswerList";

class UserProfile extends Component {
 
  componentDidMount() {
    var {user} = this.props;
    var {fetchSignedUserQuestions,fetchSignedUserAnswers} = this.props
   if(user){
       var {uid} = user
      fetchSignedUserQuestions(uid)
      fetchSignedUserAnswers(uid)
  }
}
  render() {
    var { user,questions, answers } = this.props;
       console.log(this.props)
  return (
    <div className="user-profile-container">
     
      {user ? 
            <div>
          <UserInfo user={user} />
          </div> 
          : <Redirect to="/" />}

        <div className = "question-answer-container">
            <div className="question-container">
            <h1 className = "flex">My Questions</h1>
            <QuestionTitleList  questions = {questions} />
            </div>

           <div className="answer-container">
           <h1 className = "flex">My Answers</h1>
           <AnswerList answers = {answers} />
           </div>
           
        </div>


    </div>
  );
};
}
var mapStateToProps = (state) => ({
  user: state.user.currentUser,
  questions : state.questions,
  answers : state.answers
});
var actions = {
    fetchSignedUserQuestions,
    fetchSignedUserAnswers
}
export default connect(mapStateToProps,actions)(UserProfile);
