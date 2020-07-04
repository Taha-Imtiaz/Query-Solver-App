import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { signout } from '../../Redux/user/userActions';
import { connect } from 'react-redux';

const Navbar = (props) => {
  var {user, signout} = props
  console.log(user)
  // if(user){
  //   console.log(user.uid)
  // }
  // var {uid} = user
  // console.log(uid)
  return (
   
      <div className="navbar-container flex">
      <div className="logo flex">
        <h1>Logo</h1>
      </div>

      <div className="homeLink flex">
        <Link style={{ textDecoration: "none", color: "#fbeec1" }} to="/">
          <h2>home</h2>
        </Link>
      </div>

      <div className="questionLink flex">
        <Link style={{ textDecoration: "none", color: "#fbeec1" }} to="/dashboard/questions">
          <h2>Questions</h2>
        </Link>
      </div>
    {user &&
      <div className="profileLink flex">
        <Link style={{ textDecoration: "none", color: "#fbeec1" }} to={`/userProfile/${user.uid}`}>
          <h2>Profile</h2>
        </Link>
      </div>
 }
      {user ?
      ( <div className = "askSomething-logout">
        <Link to = "/questionadderform">
        <button className = "ask-question">Ask Question</button>
        {/* {showQuestionAdderForm && <QuestionAdderForm/> } */}
        </Link>
        <button className = "signout" onClick = {() => signout()}>Signout</button>
      </div> ) :

      ( <div className = "auth-container">
        <div className="signinLink flex">
        <Link to = "/login"    style={{ textDecoration: "none", color: "#fbeec1" }}>
        <h2>Login</h2>
       </Link>
        {/* {showLoginComponent && <LoginModal openLoginModal = {showLoginComponent} closeLoginModal = {this.closeLoginModal} />} */}
     
      </div>


      <div className="signupLink flex">
        <Link to = "/signup"    style={{ textDecoration: "none", color: "#fbeec1" }}>
        <h2>Signup</h2> 
         </Link>
        {/* {showSignUpComponent && <SignupModal openSignupModal = {showSignUpComponent} closeSignupModal = {this.closeSignupModal} />} */}
      
      </div>
      </div> )}
     
  
    </div>
 
  )
}

var mapStateToProps = (state) => ({
  user : state.user.currentUser
})
var actions = {
  signout
}

export default connect(mapStateToProps,actions)(Navbar)
