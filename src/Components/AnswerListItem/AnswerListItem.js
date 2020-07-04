import React from 'react'
import "./AnswerListItem.css"

const AnswerListItem = (props) => {
    var {answer : {answerDescription, answerPostedByName}} = props
    return (
        <div className = "answer-list-item">
            <h2 style = {{display: 'flex', justifyContent : "start",alignItems : "center" ,paddingLeft :"15rem"}}>{answerDescription}</h2>
             <h2 className = "flex">{`Answered By ${answerPostedByName}`}</h2>
        </div>
    )
}

export default AnswerListItem
