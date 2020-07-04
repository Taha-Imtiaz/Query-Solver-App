import React, { Component } from "react";
import Modal from "react-responsive-modal";
import "./SignupModal.css";
import "react-responsive-modal/styles.css";
import { connect } from "react-redux";
import { signup } from "../../Redux/user/userActions";
// import LoginModal from '../LoginModal/LoginModal'
import { Link } from "react-router-dom";

class SignupModal extends Component {
  state = {
    isOpen: true,
    username: "",
    email: "",
    password: "",
    errors: {
      usernameError: "",
      passwordError: "",
      emailError: "",
    },
  };

  closeSignupModal = () => {
    var {history} = this.props
    this.setState({
      isOpen: false,
    });
    history.push("/")
  };
  //Function for form input
  handleFormInput = (e) => {
    var { name, value } = e.target;
    var { errors } = this.state;

    switch (name) {
      case "username":
        errors.usernameError =
          value.length < 5 ? "Username must be 5 character long" : "";
        break;

      case "email":
        errors.emailError =
          value.length < 5 ? "Email must be 5 character long" : "";

        var aPos = value.indexOf("@");
        var dotPos = value.lastIndexOf(".");
        if (aPos < 1 || dotPos - aPos < 3) {
          errors.emailError = "Please Enter Valid Email";
        }
        break;

      case "password":
        errors.passwordError =
          value.length < 5 ? "Password must be 5 character long" : "";
        break;

      default:
        break;
    }

    this.setState({
      errors: errors,
      [name]: value,
    });
  };
  //Function for form validation
  validateForm = () => {
    var { errors } = this.state;

    if (
      errors.usernameError.length === 0 &&
      errors.passwordError.length === 0 &&
      errors.emailError.length === 0
    ) {
      return true;
    } else {
      console.log(errors);
    }
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    var { username, email, password } = this.state;
    // var {history} = this.props;

    if (this.validateForm()) {
      var userObj = {
        fullname: username,
        email: email,
        password: password,
      };
      this.props.signup(userObj);
      this.closeSignupModal();
      // history.push("/")
    } else {
      alert("Form is Invalid");
    }
  };

  render() {
    //    var {signup,closeModal,clicked, showLoginComponent ,username,email,password,errors} = this.state
    var { isOpen, username, email, password, errors } = this.state;
    //    console.log(errors.usernameError.length)
    return (
      <div>
        <Modal
          animationDuration={1000}
          styles={{
            modal: { background: "#f9f9f9" },
            overlay: { background: "transparent" },
          }}
          open={isOpen}
          onClose={this.closeSignupModal}
          center
        //   closeOnEsc = {false}
        //   closeOnOverlayClick = {false}
        //   showCloseIcon = {false}
        >
          <div className="modal-body">
            <h1 className="flex">Signup Form</h1>
            <form onSubmit={this.handleFormSubmit}>
              <div className="username">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleFormInput}
                  required
                />
                <p>{errors.usernameError}</p>
              </div>

              <div className="email">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleFormInput}
                  required
                />
                <p>{errors.emailError}</p>
              </div>

              <div className="password">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleFormInput}
                  required
                />
                <p>{errors.passwordError}</p>
              </div>

              <div className="signupBtn flex">
                <button type="submit">Signup</button>
              </div>

              <div className="navigateLogin flex">
                Already have an account?
                <Link to="/login">
                  <span>Login</span>
                </Link>
                {/* {clicked && <LoginModal openLoginModal = {showLoginComponent} closeLoginModal = {this.closeLoginModal}/>} */}
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
var actions = {
  signup,
};

export default connect(null, actions)(SignupModal);
