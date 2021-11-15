import React from "react";
import axios from "axios";
import "../../css/login/login.css";
import Footer from "../headerandfooter/Footer";
import AlertBox from "../alertBox/AlertBox";
import {
  URL_FOR_CHANGING_THE_PASSWORD,
  CHECK_OTP_URL,
  URL_FOR_LOGIN_PAGE,
} from "../utility/Constant";

const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        Email: "",
        password: "",
        confirmpassword: "",
        otp: "",
      },
      errorMessage: "",
    };
  }

  handleChange = (event) => {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(this.state.user.Email)) {
      this.setState({ errorMessage: "Enter a valid Email Id" });
      return;
    }
    if (this.state.user.password !== this.state.user.confirmpassword) {
      this.setState({ errorMessage: "Password Doesn't matches" });
      return;
    }
    if (this.state.user.password.length < 8) {
      this.setState({
        errorMessage: "Password length should not be less than 8 characters!",
      });
      return;
    }
    const url = CHECK_OTP_URL;
    await axios
      .post(
        url,
        {
          otp: this.state.user.otp,
          email: this.state.user.Email,
        },
        {}
      )
      .then((response) => {
        const header = {
          Email: this.state.user.Email,
          Password: this.state.user.password,
        };
        axios({
          method: "put",
          url: URL_FOR_CHANGING_THE_PASSWORD,
          data: {},
          headers: header,
        }).then((response) => {
          // user credentials are legit
          alert("Password successfully changed!");
          //          console.log("User credentials valid!");

          // Redirect to Login page
          window.location.href = URL_FOR_LOGIN_PAGE;
        });
      })
      .catch((error) => {
        // TODO: log these errors
        this.setState({ errorMessage: "OTP is Wrong" });
        //        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <div className="login">
          <h2 className="login-header">Reset Your Password</h2>

          <form className="login--container">
            <input
              className="login_input"
              onChange={this.handleChange}
              name="Email"
              type="email"
              id="uname"
              placeholder="Email"
              value={this.state.user.email}
            />
            <br />
            <input
              className="login_input"
              onChange={this.handleChange}
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              value={this.state.user.password}
            />
            <br />
            <input
              className="login_input"
              onChange={this.handleChange}
              name="confirmpassword"
              type="password"
              id="password"
              placeholder="Confirm Password"
              value={this.state.user.confirmpassword}
            />
            <br />
            <input
              className="login_input"
              onChange={this.handleChange}
              name="otp"
              type="text"
              id="otp"
              placeholder="OTP"
              value={this.state.user.otp}
            />
            <br />

            {this.state.errorMessage !== "" && (
              <AlertBox severity="error" handleClose={this.handleErrorClose}>
                {this.state.errorMessage}
              </AlertBox>
            )}
            <div className="login_footer">
              <button
                className="btn--publicis-primary login_button"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
            <div class="pass_info">
              Password should have<br></br>
              <ul>
                <li>Minimum 8 Characters</li>
                <li>Atleast 1 UpperCase Character</li>
                <li>Minimum 1 Digit (0-9)</li>
              </ul>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PasswordReset;
