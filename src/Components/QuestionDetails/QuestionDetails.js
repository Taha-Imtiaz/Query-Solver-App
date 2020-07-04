import React from 'react'
import "./QuestionDetails.css"

const QuestionDetails = (props) => {
   
    var {questions} = props
    
    return (
            
            <div className = "asked-question">
                <h2 className = "flex">{questions.questionTitle}</h2>
                 <h2 style = {{display:"flex", alignItems:"start" ,justifyContent:"start" }}>{questions.questionDescription}</h2>
                   <h2 style = {{display:"flex", alignItems:"start" ,justifyContent:"start" }}>{questions.questionPostedByName}</h2>
            </div>
           
      
    )
}


 

export default QuestionDetails
