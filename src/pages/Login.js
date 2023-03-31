import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default class Login extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      email: "",
      password: "",
      invalidFlag: {
        email: "",
        password: "",
      },
    };
    return initialState;
  };

  updateFieldState = (fieldName: string, fieldValue: any) => {
    const { invalidFlag } = this.state;
    invalidFlag[fieldName] = false;
    this.setState({ [fieldName]: fieldValue, invalidFlag });
  };

  cancelFrom = () => {
    this.setState(this.getInitialState());
  };

  validate = () => {
    let isValid = true;
    const invalidFlag = { ...this.state.invalidFlag };

    if (!this.state.email) {
      invalidFlag.email = "Please enter your valid Email";
      isValid = false;
    }
    if (!this.state.password) {
      invalidFlag.password = "Please enter your valid Password";
      isValid = false;
    }
    if (!isValid) {
      this.setState({ invalidFlag });
      console.log(invalidFlag);
    }

    return isValid;
  };

  submitForm = () => {
    if (this.validate()) {
      const myValue = JSON.parse(localStorage.getItem("AUTH"));
      if (
        myValue.email === this.state.email &&
        myValue.password === this.state.password
      ) {
        window.location.href = "/Profile";
      } else {
        toast.error("Authentication Failed!");
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Sign In</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className={`form-control ${
                    this.state.invalidFlag.email ? "border border-danger" : ""
                  }`}
                  placeholder="Enter Your email"
                  value={this.state.email}
                  onChange={(e) =>
                    this.updateFieldState("email", e.target.value)
                  }
                />
                <small className="text-danger">
                  {this.state.invalidFlag.email}
                </small>
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    this.state.invalidFlag.password ? "border border-danger" : ""
                  }`}
                  placeholder="Enter  Your password"
                  value={this.state.password}
                  onChange={(e) =>
                    this.updateFieldState("password", e.target.value)
                  }
                />
                <small className="text-danger">
                  {this.state.invalidFlag.password}
                </small>
              </div>
              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label ms-1"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col-6 ">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={this.submitForm}
                  >
                    Sign Up
                  </button>
                </div>
                <div class="col-6 ">
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={this.cancelFrom}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <p className="forgot-password text-right">
                Don't have an account ? <Link to="/">Register</Link>
              </p>
            </form>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}
