import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      fullName: "",
      mobile: "",
      email: "",
      password: "",
      invalidFlag: {
        fullName: "",
        mobile: "",
        email: "",
        password: "",
      },
    };
    return initialState;
  };

  updateFieldState = (fieldName: string, fieldValue: any) => {
    const { invalidFlag } = this.state;
    invalidFlag[fieldName] = "";
    this.setState({ [fieldName]: fieldValue, invalidFlag });
  };

  validate = () => {
    let isValid = true;
    const invalidFlag = { ...this.state.invalidFlag };
    if (!this.state.fullName) {
      invalidFlag.fullName = "Please enter your Name";
      isValid = false;
    } else if (!isNaN(this.state.fullName)) {
      invalidFlag.fullName = "Please enter your valid Name";
      isValid = false;
    }

    if (!this.state.mobile) {
      invalidFlag.mobile = true;
      isValid = false;
    }
    if (!this.state.email) {
      invalidFlag.email = true;
      isValid = false;
    }
    if (!this.state.password) {
      invalidFlag.password = true;
      isValid = false;
    }

    if (!isValid) {
      this.setState({ invalidFlag });
    }

    return isValid;
  };

  cancelFrom = () => {
    this.setState(this.getInitialState());
  };

  submitForm = () => {
    const { fullName, email, mobile, password } = this.state;

    if (this.validate()) {
      let auth = {
        fullName,
        email,
        mobile,
        password,
        age: "-",
        dob: "-",
        contact: "-",
      };
      localStorage.setItem("AUTH", JSON.stringify(auth));
      window.location.href = "/login";
    }
  };

  render() {
    return (
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Register</h3>
              <div className="mb-3">
                <label>First name</label>
                <input
                  type="text"
                  className={`form-control ${
                    this.state.invalidFlag.fullName !== "" &&
                    "border border-danger"
                  }`}
                  placeholder="Enter Your First name"
                  value={this.state.fullName}
                  onChange={(e) =>
                    this.updateFieldState("fullName", e.target.value)
                  }
                />
                <small className="text-danger">
                  {this.state.invalidFlag.fullName}
                </small>
              </div>
              <div className="mb-3">
                <label>Mobile No</label>
                <input
                  type="text"
                  className={`form-control ${
                    this.state.invalidFlag.mobile ? "border border-danger" : ""
                  }`}
                  placeholder="Enter Your Mobile no"
                  value={this.state.mobile}
                  onChange={(e) =>
                    this.updateFieldState("mobile", e.target.value)
                  }
                />
                <small className="text-danger">
                  {this.state.invalidFlag.mobile &&
                    "Please enter your valid Mobile No"}
                </small>
              </div>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className={`form-control ${
                    this.state.invalidFlag.email ? "border border-danger" : ""
                  }`}
                  placeholder="Enter Your Email"
                  value={this.state.email}
                  onChange={(e) =>
                    this.updateFieldState("email", e.target.value)
                  }
                />
                <small className="text-danger">
                  {this.state.invalidFlag.email &&
                    "Please enter your valid Email address"}
                </small>
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    this.state.invalidFlag.password
                      ? "border border-danger"
                      : ""
                  }`}
                  placeholder="Enter Your password"
                  value={this.state.password}
                  onChange={(e) =>
                    this.updateFieldState("password", e.target.value)
                  }
                />
                <small className="text-danger">
                  {this.state.invalidFlag.password &&
                    "Please enter your valid Password"}
                </small>
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
                Already registered <Link to="/Login">sign in?</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
