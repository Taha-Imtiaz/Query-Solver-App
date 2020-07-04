import React from 'react'
import QuestionTitleListItem from '../QuestionTitleListItem/QuestionTitleListItem'
import "./QuestionTitleList.css"


const QuestionTitleList = (props) => {
    var {questions} = props
   
    return (
        <div className = "question-title-list-container">
            {questions.map((question) => <QuestionTitleListItem key = {question.questionId} question = {question}/>)}
        </div>
    )
}

export default QuestionTitleList
