import React from "react";
import axios from "axios";
import "../../css/profile/ChangePasswordForm.css";

import Cookies from "universal-cookie";
import { USER_SERVICE_BASE_URL } from "../utility/Constant";
const cookies = new Cookies();
// cookies.set('jwtToken', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat'));

// import Message from "../utility/Message";
// const api=axios.create({
//     baseURL:'',
//     headers:{
//         authorisation:cookies.get(),
//     },
// })

class ChangePassword_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",

      user: {
        currentPassword: "",
        newPassword: "",
      },
      isAuthenticated: false,
      isCorrect: true,
      passwordsMatch: true,
      currentError: "",
      newError: "",
      matchError: "",
    };
  }
  handleChange = (event) => {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.state[event.target.name] = event.target.value;
    this.setState({ user });
    this.setState({ confirmNewPassword: this.state.confirmNewPassword });
  };

  valid() {
    //validations
    //1) old password is matching !! --> done
    //2) newpassword==confirmnewpassword--> done
    //3) newpassword should have length >=8 and <=20
    //4) newpassword should have atleast 1 integer, 1 alphabet,  symbol, and should not start with symbol
    var pattern = new RegExp(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/
    );
    if (this.state.user.newPassword.length < 8) {
      this.setState({
        newError: "Passwords length should not be less than 8 characters",
        isCorrect: false,
      });
      return false;
    } else if (this.state.user.newPassword.length > 20) {
      this.setState({
        newError: "Passwords length should not be greater than 20 characters",
        isCorrect: false,
      });
      return false;
    } else if (!pattern.test(this.state.user.newPassword)) {
      this.setState({
        newError:
          "Passwords should not start with special char, should be between 8 and 20 chars, should contain atleast 1 alphabet, 1 digit, and 1 special character",
        isCorrect: false,
      });
      return false;
    } else if (this.state.confirmNewPassword !== this.state.user.newPassword) {
      this.setState({
        passwordsMatch: false,
        matchError: "Passwords do not match",
      });
      return false;
    } else {
      return true;
    }
  }

  handleSubmit = async (event) => {
    //////////async^
    event.preventDefault();
    this.setState({
      currentError: "",
      newError: "",
      matchError: "",
    });

    const URL = USER_SERVICE_BASE_URL + "/user/change-password/";

    if (this.valid()) {
    } //

    // if(!this.valid())
    //     return;
    //
    if (this.state.passwordsMatch) {
      //await

      let jwtTokenCookie = new Cookies(); ////Creating Cookie object
      //      console.log(jwtTokenCookie.get("jwtToken"));
      await axios
        .put(
          URL,
          {
            currentPassword: this.state.user.currentPassword,
            newPassword: this.state.user.newPassword,
          },
          {
            headers: {
              Authorization: jwtTokenCookie.get("jwtToken"), ///assigning the value of token to the variable and sending it in headers
              //token
            },
          }
        )
        .then((response) => {
          this.setState({ isAuthenticated: true });
          // console.log(
          //   "success :: jwtToken is : " + jwtTokenCookie.get("jwtToken")
          // );
          alert("password changed successfully!");
          return this.valid();
          //SUCCESSFUL PASSWORD UPDATE
        })
        .catch((error) => {
          // alert("current password is incorrect")
          // console.log(
          //   "failiure :: jwtToken is : " + jwtTokenCookie.get("jwtToken")
          // );

          this.setState({
            isCorrect: false,
            confirmNewPassword: "",
            user: {
              currentPassword: "",
              newPassword: "",
            },
            currentError: "current password is incorrect",
          });
        });
    } else {
      // alert("passwords do not match");
      this.setState({
        confirmNewPassword: "",
        user: {
          newPassword: "",
        },
        currentError: "",
        newError: "",
        matchError: "",
        // isAuthenticated: false,
      });
    }
  };
  render() {
    return (
      <div>
        <div className="--form-card-publicis">
          {/* <h1>{this.state.count}</h1> */}
          <div className="--form-card-publicis-header">Password Reset</div>

          <div className="--form-card-publicis-body">
            <form
              className="ChangePasswordForm--container"
              onSubmit={this.handleSubmit}
            >
              {/* <label htmlFor="currentPassword">Enter Current Password</label><br /> */}
              <input
                onChange={this.handleChange}
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                id="currentPassword"
                className="ChangePasswordForm_input"
                value={this.state.user.currentPassword}
              />
              <p className="ChangePasswordForm-warning">
                {this.state.currentError}
              </p>

              {/* <label htmlFor="newPassword">Enter New Password</label><br /> */}
              <input
                onChange={this.handleChange}
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                id="newPassword"
                className="ChangePasswordForm_input"
                value={this.state.user.newPassword}
              />
              <p className="ChangePasswordForm-warning">
                {this.state.newError}
              </p>

              {/* <label  htmlFor="confirmNewPassword">Re-Enter New Password</label><br /> */}
              <input
                onChange={this.handleChange}
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                id="confirmNewPassword"
                className="ChangePasswordForm_input"
                value={this.state.confirmNewPassword}
              />
              <p className="ChangePasswordForm-warning">
                {this.state.matchError}
              </p>

              <button
                type="submit"
                className="btn--publicis-primary ChangePasswordForm_button"
              >
                Change Password
              </button>
            </form>
          </div>
          {/* <h1>{this.state.first_name}</h1> */}
          {/* <p>{this.state.user.currentPassword}</p>
                    <p>{this.state.user.newPassword}</p>
                    <p>{this.state.confirmNewPassword}</p> */}
        </div>
      </div>
    );
  }
}

export default ChangePassword_;

// TESTING
// npm run test -- --coverage --watchAll=false
