import React from 'react'
import AnswerListItem from '../AnswerListItem/AnswerListItem'
import "./AnswerList.css"

const AnswerList = (props) => {
   var {answers} = props
  //  console.log(answers)
    return (
        <div className = "answer-list-container">
      {answers.map((answer)=> <AnswerListItem key = {answer.answerId} answer = {answer}/>)}
        </div>
    )
}

export default AnswerList
