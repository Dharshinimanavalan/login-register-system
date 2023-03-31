import React, { Component } from "react";
import "../style.css";
import profileImg from "../images/profile.png";
import { ToastContainer, toast } from "react-toastify";

class Profile extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      fullName: "",
      mobile: "",
      email: "",
      age: "",
      dob: "",
      contact: "",
      invalidFlag: {
        age: "",
        dob: "",
      },
      modal: "",
    };
    return initialState;
  };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let profileDetails = JSON.parse(localStorage.getItem("AUTH"));
    this.setState({
      fullName: profileDetails.fullName,
      mobile: profileDetails.mobile,
      email: profileDetails.email,
      age: profileDetails.age,
      dob: profileDetails.dob,
      contact: profileDetails.contact,
    });
  };

  updateFieldState = (fieldName: string, fieldValue: any) => {
    const { invalidFlag } = this.state;
    invalidFlag[fieldName] = "";
    this.setState({ [fieldName]: fieldValue, invalidFlag });
  };

  validate = () => {
    let isValid = true;
    const invalidFlag = { ...this.state.invalidFlag };
    if (this.state.age === "") {
      invalidFlag.age = true;
      isValid = false;
    }
    if (this.state.dob === "") {
      invalidFlag.dob = true;
      isValid = false;
    }
    if (this.state.contact === "") {
      invalidFlag.contact = true;
      isValid = false;
    }
    if (!isValid) {
      this.setState({ invalidFlag });
    }

    return isValid;
  };

  submit = () => {
    if (this.validate()) {
      toast.success("Profile Updated Successfully");
      let profileDetails = JSON.parse(localStorage.getItem("AUTH"));
      localStorage.setItem(
        "AUTH",
        JSON.stringify({
          ...profileDetails,
          age: this.state.age,
          dob: this.state.dob,
          contact: this.state.contact,
        })
      );

      this.setState({ modal: "modal" });
    }
  };

  render() {
    return (
      <div className="bg-container">
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <div className="card">
            <div className="card-body p-3 p-sm-5">
              <div className="row">
                <div className="col-md-5">
                  <div className="profile text-center">
                    <img
                      src={profileImg}
                      className="img-fluid w-75 m-auto"
                      alt="profile"
                    />
                  </div>
                  <div className="about text-center">
                    <h4 className="py-2 m-0">About Me</h4>
                    <p>
                      As a experienced frontend developer, I am seeking a role
                      which allows me to continue learning and perfecting my
                      skills as I provide high- quality work, and encourages me
                      to flourish as a software developer.
                    </p>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="role pb-2 border-bottom border-danger">
                    <h1>
                      <span class="badge bg-warning letter-spacing text-uppercase mb-2">
                        Hello
                      </span>
                    </h1>
                    <span>I'm </span>
                    <h3 className="d-inline">{this.state.fullName}</h3>
                    <p>
                      <i>Web Developer</i>
                    </p>
                  </div>
                  <div className="profile-details pt-4">
                    <div className="row">
                      <div className="col-5 col-sm-6">
                        <h5>Full Name</h5>
                        <h5>Mobile No</h5>
                        <h5>Email</h5>
                        <h5>Age</h5>
                        <h5>DOB</h5>
                        <h5>Contact</h5>
                      </div>
                      <div className="col-7 col-sm-6">
                        <h5>: {this.state.fullName}</h5>
                        <h5>: {this.state.mobile}</h5>
                        <h5>: {this.state.email}</h5>
                        <h5>: {this.state.age}</h5>
                        <h5>: {this.state.dob}</h5>
                        <h5>: {this.state.contact}</h5>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-warning mt-4 w-25 text-white"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit Profile
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Age :
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          this.state.invalidFlag.age
                            ? "border border-danger"
                            : ""
                        }`}
                        id="recipient-name"
                        placeholder="Enter Your Age"
                        value={this.state.age}
                        onChange={(e) =>
                          this.updateFieldState("age", e.target.value)
                        }
                      />
                      <small className="text-danger">
                        {this.state.invalidFlag.age &&
                          "Please enter your valid age"}
                      </small>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        DOB :
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          this.state.invalidFlag.dob
                            ? "border border-danger"
                            : ""
                        }`}
                        id="recipient-name"
                        placeholder="Enter Your DOB"
                        value={this.state.dob}
                        onChange={(e) =>
                          this.updateFieldState("dob", e.target.value)
                        }
                      />
                      <small className="text-danger">
                        {this.state.invalidFlag.dob &&
                          "Please enter your valid dob"}
                      </small>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Contact Address :
                      </label>
                      <textarea
                        className={`form-control ${
                          this.state.invalidFlag.contact
                            ? "border border-danger"
                            : ""
                        }`}
                        id="message-text"
                        placeholder="Enter Your Contect"
                        value={this.state.contact}
                        onChange={(e) =>
                          this.updateFieldState("contact", e.target.value)
                        }
                      />
                      <small className="text-danger">
                        {this.state.invalidFlag.contact &&
                          "Please enter your valid dob"}
                      </small>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success text-white"
                    onClick={this.submit}
                    data-bs-dismiss={`${this.state.modal}`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
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

export default Profile;
