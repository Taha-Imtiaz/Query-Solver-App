import React, { Component } from 'react'
import "./QuestionAdderForm.css"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addQuestion } from '../../Redux/questions/questionActions'

class QuestionAdderForm extends Component {
    state = {
       questionTitle : '',
        questionDescription : ''
    }
    handleFormInput = (e) => {
        var {name,value} = e.target;
        this.setState({
            [name] : value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        var {questionTitle,questionDescription} = this.state;
        var {user : {uid,fullname}, history} =this.props;
       
        var {addQuestion} = this.props
     
        var askedQuestionObj = {
            questionTitle :questionTitle,
            questionDescription : questionDescription,
            questionPostedBy : uid,
            questionPostedByName : fullname
        }
       addQuestion(askedQuestionObj , () => history.push("/dashboard/questions")  )
    }
    render() {
       var {user} = this.props
    
       var {questionTitle,questionDescription} =this.state
        return (
            
            <div>
         {user ? (
             <div className="question-adder-form">
              <div className=" form-container">
              <div className="form-heading flex"><h1>Ask a Question</h1></div>
             <div className="form-grid">
          
                 <div className="form-fields">
                 <form onSubmit = {this.handleSubmit}>
                 <div className="question-title">
                    <label htmlFor="">Title</label>
                    <input type="text"  name = "questionTitle" value ={questionTitle} onChange = {this.handleFormInput} required/>
                </div>
                <div className="question-description">
                    <label htmlFor="">Description</label>
                    <input type="text" name = "questionDescription" value = {questionDescription} onChange = {this.handleFormInput} required/>
                </div>
                <div className="question-submit-btn flex">
                    <button className = "flex">Post</button>
                </div>
                </form>
            </div>
            
             </div>
             </div> 
             </div>
         ) : <Redirect to = "/login"></Redirect>}  
            </div>
        )
    }
}
var mapStateToProps = (state) => ({
    user : state.user.currentUser
})

var actions = {
    addQuestion
}

export default connect(mapStateToProps,actions)(QuestionAdderForm)
