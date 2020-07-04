import React, { Component } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./LoginModal.css";
// import SignupModal from '../SignupModal/SignupModal'
import { connect } from "react-redux";
import { signin, googleLogin } from "../../Redux/user/userActions";
import { Link} from "react-router-dom";

class LoginModal extends Component {
  state = {
    isOpen: true,
    email: "",
    password: "",
    errors: {
      emailError: "",
      passwordError: "",
    },
  };

  closeLoginModal = () => {
    var {history} = this.props
    this.setState({
      isOpen: false,
    });
    history.push("/")
  };

  handleFormInput = (e) => {
    var { name, value } = e.target;
    var { errors } = this.state;

    switch (name) {
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
  validateForm = () => {
    var { errors } = this.state;

    if (errors.passwordError.length === 0 && errors.emailError.length === 0) {
      return true;
    } else {
      console.log(errors);
    }
  };
  handleFormSubmit = (e) => {
    var { signin} = this.props;

    e.preventDefault();
    var { email, password } = this.state;
    if (this.validateForm()) {
      var userObj = {
        email: email,
        password: password,
      };
      signin(userObj);
      this.closeLoginModal();
      // history.push("/")
      
    } else {
      alert("Form is Invalid");
    }
  };
  render() {
    // var {login,closeLoginModal,clicked,showSignUpComponent, email,password,errors} = this.state;
    var { email, password, errors, isOpen } = this.state;
    var { googleLogin} = this.props;
    return (
      <div>
        <Modal
          animationDuration={1000}
          styles={{
            modal: { background: "#f7f7f7" },
            overlay: { background: "transparent" },
          }}
          open={isOpen}
          onClose={this.closeLoginModal}
          center
        //   closeOnEsc = {false}
        //   closeOnOverlayClick = {false}
        //   showCloseIcon = {false}
        >
          <div className="loginmodal-body">
            <h1 className="flex">Login Form</h1>

            <form onSubmit={this.handleFormSubmit}>
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

              <div className="loginBtn flex">
                <button type="submit">Login</button>
                <h3>OR</h3>
              </div>

              <div className="googleloginBtn flex">
                <button
                  type="button"
                  onClick={() => {
                    googleLogin();
                    this.closeLoginModal();
                    // history.push("/")

                  }}
                >
                  Google Login
                </button>
              </div>

              <div className="navigateSignup flex">
                Don't have an account?
                <Link to="/signup">
                  <span>Signup</span>
                </Link>
                {/* {clicked && <SignupModal openSignupModal = {showSignUpComponent} closeSignupModal = {this.closeSignupModal}/>} */}
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
var actions = {
  signin,
  googleLogin,
};

export default connect(null, actions)(LoginModal);
