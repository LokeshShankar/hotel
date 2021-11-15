import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../../css/profile/Profile.css";
import Cookies from "universal-cookie";
import $ from "jquery";
import { USER_SERVICE_BASE_URL } from "../utility/Constant";

class Profile extends React.Component {
  state = {
    firstName: "Unavailable",
    lastName: "Unavailable",
    email: "Unavailable",
    phone: "Unavailable",
    yearOfBirth: "Unavailable",
    address: "Unavailable",
    pinCode: "Unavailable",
    city: "Unavailable",
    password: "Unavailable",
    groupName: "Unavailable",

    message: "",

    firstNameError: "",
    lastNameError: "",
    emailError: "",
    phoneError: "",
    yearOfBirthError: "",
    addressError: "",
    pinCodeError: "",
    cityError: "",
  };

  componentDidMount() {
    $("#input-first-name").on("input", (e) => {
      e.preventDefault();

      this.setState({
        firstNameError:
          /^[a-zA-Z]*$/.test(e.target.innerText) === false ||
          e.target.innerText.length === 0
            ? "Please enter only alphabets without space"
            : "",
      });
    });
    $("#input-last-name").on("input", (e) => {
      e.preventDefault();
      axios.put();
      this.setState({
        lastNameError:
          /^[a-zA-Z]*$/.test(e.target.innerText) === false ||
          e.target.innerText.length === 0
            ? "Please enter only alphabets without space"
            : "",
      });
    });
    $("#input-email").on("input", (e) => {
      e.preventDefault();

      this.setState({
        emailError:
          /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(
            e.target.innerText
          ) === false || e.target.innerText.length === 0
            ? "Please enter a valid email"
            : "",
      });
    });
    $("#input-phone").on("input", (e) => {
      e.preventDefault();

      this.setState({
        phoneError:
          /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(
            e.target.innerText
          ) === false || e.target.innerText.length === 0
            ? "Please enter a valid phone number"
            : "",
      });
    });
    $("#input-year-of-birth").on("input", (e) => {
      e.preventDefault();

      this.setState({
        yearOfBirthError:
          /^[0-9]{4}$/.test(e.target.innerText) === false ||
          e.target.innerText.length === 0
            ? "Please enter a 4 digit number"
            : "",
      });
    });
    $("#input-pinCode").on("input", (e) => {
      e.preventDefault();

      this.setState({
        pinCodeError:
          /^\d{6}$/.test(e.target.innerText) === false ||
          e.target.innerText.length === 0
            ? "Please enter a 6 digit number"
            : "",
      });
    });

    let dataObject;
    let jwtTokenCookie = new Cookies();
    axios
      .get(USER_SERVICE_BASE_URL + "/user/fetch/", {
        headers: {
          Authorization: jwtTokenCookie.get("jwtToken"), ///assigning the value of token to the variable and sending it in headers
        },
      })
      .then((response) => {
        dataObject = response.data;

        this.setState({
          firstName: dataObject.firstName,
          lastName: dataObject.lastName,
          email: dataObject.email,
          phone: dataObject.phone,
          yearOfBirth: dataObject.yearOfBirth,
          pinCode: dataObject.pinCode,
          address: dataObject.address,
          city: dataObject.city,
          groupName: dataObject.groupName,
        });
      })
      .catch((error) => {
        //        console.log("failiure :: User is not logged in");
      });
  }
  hasError = () => {
    return (
      this.state.firstNameError !== "" ||
      this.state.lastNameError !== "" ||
      this.state.emailError !== "" ||
      this.state.phoneError !== "" ||
      this.state.yearOfBirthError !== "" ||
      this.state.addressError !== "" ||
      this.state.pinCodeError !== "" ||
      this.state.cityError !== ""
    );
  };
  handleSubmit = async (event) => {
    this.state.firstName =
      document.getElementById("input-first-name").innerText;
    this.state.lastName = document.getElementById("input-last-name").innerText;
    this.state.email = document.getElementById("input-email").innerText;
    this.state.phone = document.getElementById("input-phone").innerText;
    this.state.yearOfBirth = document.getElementById(
      "input-year-of-birth"
    ).innerText;
    this.state.address = document.getElementById("input-address").innerText;
    this.state.pinCode = document.getElementById("input-pinCode").innerText;
    this.state.city = document.getElementById("input-city").innerText;

    event.preventDefault();
    if (this.hasError()) {
      alert("There are items that need your attention");
    } else {
      let object = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        yearOfBirth: this.state.yearOfBirth,
        address: this.state.address,
        pinCode: this.state.pinCode,
        city: this.state.city,
        // password: this.state.password,
        groupName: this.state.groupName,
      };
      //      console.log(object);

      let jwtTokenCookie = new Cookies();
      await axios
        .put(USER_SERVICE_BASE_URL + "/user/edit/", object, {
          headers: {
            Authorization: jwtTokenCookie.get("jwtToken"), ///assigning the value of token to the variable and sending it in headers
            //token
          },
        })
        .then((response) => {
          this.setState({ message: "UPDATE SUCCESS" });
          alert("User updated");
        })
        .catch((error) => {
          this.setState({ message: "UPDATE FAILIURE" });
          //          console.log(error + " this is error");
          this.state.err = error;
          //this.setState({err:error})
        });
    }
  };
  render() {
    return (
      // <div>
      <div className="--form-card-publicis">
        <div id="updateProfileTitle" className="--form-card-publicis-header">
          Update your Profile
        </div>

        <div className="--form-card-publicis-body">
          <form onSubmit={this.handleSubmit}>
            {/* For first name----------------------------------------------------------------------------------- */}
            <div className="inline">
              <label className="required-field" htmlFor="UiPage">
                First Name
              </label>
            </div>
            <div className="inline">
              <p
                contenteditable="true"
                className="Profile_input"
                id="input-first-name"
              >
                {this.state.firstName}
              </p>
            </div>
            <br />
            <div className="inline">
              <span className="Profile-warning">
                {this.state.firstNameError}
              </span>
            </div>
            <br />
            {/* For last name----------------------------------------------------------------------------------- */}
            <div className="inline">
              <label className="required-field" htmlFor="UiPage">
                Last Name
              </label>
            </div>
            <div className="inline">
              <p
                contenteditable="true"
                className="Profile_input"
                id="input-last-name"
              >
                {this.state.lastName}
              </p>
            </div>
            <br />
            <div className="inline">
              <span className="Profile-warning">
                {this.state.lastNameError}
              </span>
            </div>
            <br />
            {/* For email----------------------------------------------------------------------------------- */}
            <div className="inline">
              <label className="required-field" htmlFor="UiPage">
                Email
              </label>
            </div>
            <div className="inline">
              <p
                contenteditable="true"
                className="Profile_input"
                id="input-email"
              >
                {this.state.email}
              </p>
            </div>
            <br />
            <div className="inline">
              <span className="Profile-warning">{this.state.emailError}</span>
            </div>
            <br />
            {/* For phone----------------------------------------------------------------------------------- */}
            <div className="inline">
              <label className="required-field" htmlFor="UiPage">
                Phone with country code
              </label>
            </div>
            <div className="inline">
              <p
                contenteditable="true"
                className="Profile_input"
                id="input-phone"
              >
                {this.state.phone}
              </p>
            </div>
            <br />
            <div className="inline">
              <span className="Profile-warning">{this.state.phoneError}</span>
            </div>
            <br />
            {/* For yearOfBirth----------------------------------------------------------------------------------- */}
            <div className="inline">
              <label className="required-field" htmlFor="UiPage">
                Year of Birth
              </label>
            </div>
            <div className="inline">
              <p
                contenteditable="true"
                className="Profile_input"
                id="input-year-of-birth"
              >
                {this.state.yearOfBirth}
              </p>
            </div>
            <br />
            <div className="inline">
              <span className="Profile-warning">
                {this.state.yearOfBirthError}
              </span>
            </div>
            <br />
            {/* For address----------------------------------------------------------------------------------- */}
            <div className="inline">
              <label className="required-field" htmlFor="UiPage">
                Address
              </label>
            </div>
            <div className="inline">
              <p
                contenteditable="true"
                className="Profile_input"
                id="input-address"
              >
                {this.state.address}
              </p>
            </div>
            <br />
            <div className="inline">
              <span className="Profile-warning">{this.state.addressError}</span>
            </div>
            <br />
            {/* For pinCode----------------------------------------------------------------------------------- */}
            <div className="inline">
              <label className="required-field" htmlFor="UiPage">
                pinCode
              </label>
            </div>
            <div className="inline">
              <p
                contenteditable="true"
                className="Profile_input"
                id="input-pinCode"
              >
                {this.state.pinCode}
              </p>
            </div>
            <br />
            <div className="inline">
              <span className="Profile-warning">{this.state.pinCodeError}</span>
            </div>
            <br />
            {/* For city----------------------------------------------------------------------------------- */}
            <div className="inline">
              <label className="required-field" htmlFor="UiPage">
                City
              </label>
            </div>
            <div className="inline">
              <p
                contenteditable="true"
                className="Profile_input"
                id="input-city"
              >
                {this.state.city}
              </p>
            </div>
            <br />
            <div className="inline">
              <span className="Profile-warning">{this.state.cityError}</span>
            </div>

            <div class="profile_btn-group">
              <button
                className="btn--publicis-primary Profile_button"
                type="submit"
              >
                {" "}
                Update{" "}
              </button>
              <NavLink to="/change-password" style={{ textDecoration: "none" }}>
                <button className="btn--publicis-primary Profile_button">
                  Change Password
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      // </div>
    );
  }
}

export default Profile;
