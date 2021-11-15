import React from "react";
import axios from "axios";
import "../../css/login/login.css";
import "../../css/checkin_checkout/checkin_checkout.css";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import Cookies from "universal-cookie/lib";
import { Input } from "../utility/Input";
import Button from "../utility/Button";

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      aadharId: "",
      bookingId: this.props.location.state.bookingId,
      checkInDate: new Date().toISOString().substr(0, 10),
      checkInTime: (new Date().getHours() < 10 ? '0' : '') + new Date().getHours() + ":" +(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes(),
      successMsg: "",
      failureMsg: "",
      errors: {},
    };

    // this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (event, field) => {
    this.setState({[field]: event.target.value});
  }
  handleCorrectness = (event) => {
    let isCorrect = true;
    let errorMap = {};

    // Email
    let emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegex.test(this.state.email.toLowerCase())) {
      isCorrect = false;
      if (this.state.email === "") errorMap["email"] = "Email can't be empty";
      else errorMap["email"] = "Email Invalid";
    }

    // Aadhar Card
    let aadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    if (this.state.aadharId === "") {
      isCorrect = false;
      errorMap["aadharId"] = "Aadhar Number can't be empty!";
    } else if (
      this.state.aadharId !== "" &&
      !aadharRegex.test(this.state.aadharId)
    ) {
      isCorrect = false;
      errorMap["aadharId"] = "Invalid Aadhar Number!";
    }

    this.setState({ errors: errorMap });
    return isCorrect;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let object = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      aadhar: this.state.aadharId,
      bookingId: this.state.bookingId,
      checkInDate: this.state.checkInDate,
      checkInTime: this.state.checkInTime,
    };

    let jwtTokenCookie = new Cookies();

    if (this.handleCorrectness(event)) {
      await axios
        .post(HOTEL_SERVICE_BASE_URL + "/checkin/add", object, {
          headers: {
            Authorization: jwtTokenCookie.get("jwtToken"),
          },
        })
        .then((res) => {
          // console.log(this.props.hotelId)
          alert("CheckIn status updated successfully");
          this.props.history.push({
            pathname: "/admin/bookings",
            state: {
              hotelid: this.props.location.state.hotelId,
            }, 
          })
        })
        .catch((error) => {
          this.setState({
            failureMsg: "CheckIn status update failed. Try Again! ",
          });
        });
    }
  };

  render() {
    return (
      <div className="--form-card-publicis">
        {this.state.successMsg !== "" && (
          <p className="checkin_checkout-warning">{this.state.successMsg}</p>
        )}
        {this.state.failureMsg !== "" && (
          <p className="checkin_checkout-warning">{this.state.failureMsg}</p>
        )}
        {/* <h1 className="checkin_checkout-header">Check In</h1> */}
        <div className="--form-card-publicis-header">Check In</div>
        <div className="--form-card-publicis-body">
          {/* <div className="checkin_checkout-sub-container"> */}
          {/* <div className="checkin_checkout-name-container">
                        <div className="group"> */}
          <div className="--form-publicis-group">
            <label className="--form-publicis-input">
              Booking Id : {this.state.bookingId}
            </label>
          </div>
          <div className="--form-publicis-group">
            <Input
              type="text"
              label="First Name *"
              className="--form-publicis-input"
              id="firstName"
              size="12"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={(event) => this.handleChange(event, "firstName")}
            />
            {/* <label htmlFor="firstName" className="myInput-label">First Name</label> */}
          </div>
          <div className="--form-publicis-group">
            <Input
              type="text"
              id="lastName"
              label="Last Name *"
              className="--form-publicis-input"
              //    size="12"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={(event) => this.handleChange(event, "lastName")}
            />
            {/* <label htmlFor="lastName" className="myInput-label">Last Name</label> */}
          </div>
          {/* </div> */}
          <div className="--form-publicis-group">
            <Input
              type="email"
              //    required
              label="Email Id *"
              className="--form-publicis-input"
              placeholder="Email"
              id="email"
              //    size="30"
              value={this.state.email}
              onChange={(event) => this.handleChange(event, "email")}
            />
            {/* <label htmlFor="email" className="required">Email</label> */}
            {this.state.errors["email"] &&
              this.state.errors["email"] !== "" && (
                <p className="error-name-admin">{this.state.errors["email"]}</p>
              )}
          </div>

          <div className="--form-publicis-group">
            <Input
              type="text"
              label="Aadhar Card *"
              className="--form-publicis-input"
              placeholder="Aadhar Card"
              id="aadharId"
              value={this.state.aadharId}
              onChange={(event) => this.handleChange(event, "aadharId")}
            />
            {/* <label htmlFor="aadharId">Aadhar </label> */}
            {this.state.errors["aadharId"] &&
              this.state.errors["aadharId"] !== "" && (
                <p className="error-name-admin">
                  {this.state.errors["aadharId"]}
                </p>
              )}
          </div>
          <div className="--form-publicis-group">
            <Input
              type="date"
              label="CheckIn Date *"
              className="--form-publicis-input"
              id="checkInDate"
              value={this.state.checkInDate}
              onChange={(event) => this.handleChange(event, "checkInDate")}
            />
            {/* <label htmlFor="checkInDate">CheckIn Date </label> */}
            {this.state.errors["checkInDate"] &&
              this.state.errors["checkInDate"] !== "" && (
                <p className="error-name-admin">
                  {this.state.errors["checkInDate"]}
                </p>
              )}
          </div>
          <div className="--form-publicis-group">
            <Input
              type="time"
              id="checkInTime"
              label="CheckIn Time *"
              className="--form-publicis-input"
              value={this.state.checkInTime}
              onChange={(event) => this.handleChange(event, "checkInTime")}
            />
            {/* <label htmlFor="checkInTime">CheckIn Time </label> */}
            {this.state.errors["checkInTime"] &&
              this.state.errors["checkInTime"] !== "" && (
                <p className="error-name-admin">
                  {this.state.errors["checkInTime"]}
                </p>
              )}
          </div>
          <Button
            cssClassName="btn--publicis-primary"
            label="Submit"
            handleClick={this.handleSubmit}
          ></Button>
        </div>
      </div>
    );
  }
}

export default CheckIn;
