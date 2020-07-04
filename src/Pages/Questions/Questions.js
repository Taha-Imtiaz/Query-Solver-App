import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchQuestions } from '../../Redux/questions/questionActions';
import QuestionTitleList from '../../Components/QuestionTitleList/QuestionTitleList';
import "./Questions.css"


 class Questions extends Component {
    componentDidMount() {
        var {fetchQuestions} = this.props;
        fetchQuestions()
    }
    
    render() {
        var {questions} = this.props;
        
        return (
            <div className = "question-page-conatiner">
                {questions.length > 0 ? 
                (<table className = "question-table">
                    <thead>
                        <tr>
                    <th className = "flex">Title</th>
                    <th style ={{display : "flex", justifyContent: "start", alignItems: 'center',}}>View Question</th>
            </tr>
            </thead>
            
                </table>) : null}
                <QuestionTitleList questions = {questions}/>
            </div>
        )
    }
}
var mapStateToProps = (state) => ({
    questions : state.questions
})
var actions = {
    fetchQuestions
}
export default connect(mapStateToProps, actions)(Questions)
