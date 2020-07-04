import React, { Component } from "react";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import "./AnswerForm.css"
import { connect } from "react-redux";
import { addAnswer } from "../../Redux/answers/answerActions";

class AnswerForm extends Component {
  state = {
    answerDescription : '',
    isOpen: false
  }

  handleFormInput = (e) => {
    var {name, value} = e.target;
    this.setState({
      [name] : value
    })
  }
  onOpenModal = () => {
    this.setState({ isOpen: true });
  };
  onCloseModal = () => {
    this.setState({
      isOpen: false,
    });
  };
     handleFormSubmit = (e) => {
      var {user : {uid,fullname}, questionId} = this.props
      var {addAnswer} = this.props;
      
           e.preventDefault();
           var {answerDescription} = this.state;
           var answerObj = { 
               answerDescription : answerDescription,
               answerPostedBy:uid,
               answerPostedByName: fullname,
              answerTotheQuestion: questionId
        
              }
             console.log(answerObj)
            addAnswer(answerObj)
           this.onCloseModal()
      
     }
  render() {
      var {isOpen, answerDescription} = this.state
    
     
    return (
      <div className = "answer-form-container">
      <button onClick = {this.onOpenModal}>Add Answer</button>
         <Modal
          animationDuration={1000}
          styles={{
            modal: { background: "#f7f7f7" },
            overlay: { background: "transparent" },
          }}
          open={isOpen}
          onClose={this.onCloseModal}
          center
          >
             <div className="addAnswer-body">
                  <h1 className = "flex">Answer Form</h1>
                  
                     <form onSubmit = {this.handleFormSubmit}>
                     
                      <div className="answerDescription">
                      <label htmlFor="">Answer Description</label>
                     <input type="text" name = "answerDescription" value = {answerDescription} onChange = {this.handleFormInput} required/>
                   
                    </div>
                    <div className="addAnswerBtn flex">
                        <button type ="submit">ADD</button>
                           
                    </div>
                    </form>
                   </div>
          </Modal> 
      </div>
    );
  }
}
var mapStateToProps = (state) => ({
user : state.user.currentUser
})
var actions = {
  addAnswer
}
export default connect(mapStateToProps,actions)(AnswerForm);
