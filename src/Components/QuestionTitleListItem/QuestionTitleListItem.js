import React from 'react'
import "./QuestionTitleListItem.css"
// import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const QuestionTitleListItem = (props) => {
    var {question:{questionTitle,questionId}} = props
    var {history} = props
    // console.log(pathname,questionId)
    return (
        <div className = "question-item">
           <div> <p className = "question-title flex">{questionTitle}</p></div>
           <div> <button onClick = {() => history.push(`/dashboard/questions/${questionId}`)} className = "question-button flex">View</button></div>
        </div>
    )
}

export default withRouter(QuestionTitleListItem)
