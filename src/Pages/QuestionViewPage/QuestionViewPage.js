import React,{Component} from 'react'
import "./QuestionViewPage.css"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AnswerForm from '../../Components/AnswerForm/AnswerForm'
import QuestionDetails from '../../Components/QuestionDetails/QuestionDetails'
import AnswerList from '../../Components/AnswerList/AnswerList'
import { fetchAnswer } from '../../Redux/answers/answerActions'
import "./QuestionViewPage.css"

class QuestionViewPage extends Component  {

    componentDidMount() {
        var {fetchAnswer, match : {params:{questionId}}} = this.props

        // console.log(questionId)
        fetchAnswer(questionId)
    }
    render(){
    var {questions, user, answers} = this.props;
    // console.log(answers)
   return (
        <div className = "question-view-container">
              {questions ? (
                  <div className = "question-details-component">
                     <table className = "question-view-table ">
                         <thead>
                             <tr>
                         <th className = "flex"> Title</th>
                         <th style = {{display:"flex", alignItems:"center" ,justifyContent:"start" }}>Description</th>
                         <th style = {{display:"flex", alignItems:"center" ,justifyContent:"start" }}>asked By</th>
                         </tr>
                         </thead>
                     </table>
           <QuestionDetails questions = {questions}/>
           </div>

     )  : <Redirect to = "/dashboard/questions"/>} 

            <div className="answer-form-component">
              {user && <AnswerForm  questionId = {questions.questionId}/>}
              </div>

              <div className="answer-list-component">

              <AnswerList answers = {answers}/>
              </div>
     </div>
)
}
}

var mapStateToProps = (state, {match : {params:{questionId}}}) =>({
    questions : state.questions.find((question) => question.questionId === questionId),
    user : state.user.currentUser,
    answers:state.answers
   
 })
 var actions = {
     fetchAnswer
 }

export default connect(mapStateToProps, actions)(QuestionViewPage)
