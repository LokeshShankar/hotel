import React from "react";
import axios from "axios";
import Footer from "../headerandfooter/Footer";
import "../../css/login/login.css";
import AlertBox from "../alertBox/AlertBox";
import { USER_DETAILS_PAGE_URL, GENERATE_OTP_URL } from "../utility/Constant";

const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class EmailForPasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isAuthenticated: false,
      errorMessage: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // default values before submitting
    if (!EMAIL_PATTERN.test(this.state.email)) {
      this.setState({ errorMessage: "Enter a valid Email Id" });
      return;
    }
    const url = USER_DETAILS_PAGE_URL;
    await axios
      .get(url, {
        headers: {
          Email: this.state.email,
        },
      })
      .then((response) => {
        if (response.data === "") {
          this.setState({ isAuthenticated: false });
          this.setState({ errorMessage: "User is not registered" });
        } else {
          this.setState({ isAuthenticated: true });
          const url = GENERATE_OTP_URL + this.state.email;
          axios.post(url, {}, {}).then((response) => {
            //            console.log("otp sent");
          });
          this.setState({ isAuthenticated: true });
          alert("Email is succesfully sent");
        }
      })
      .catch((error) => {
        // TODO: log these errors
        //        console.log(error);
        this.setState({ isAuthenticated: false });
        this.setState({ errorMessage: "User is not registered" });
      });
  };

  render() {
    return (
      <div>
        <div className="login">
          <h2 className="login-header">Enter email </h2>
          <form className="login--container">
            <input
              className="login_input"
              onChange={this.handleChange}
              name="email"
              type="email"
              id="uname"
              placeholder="Email"
              value={this.state.email}
            />
            {this.state.errorMessage !== "" && (
              <AlertBox severity="error" handleClose={this.handleErrorClose}>
                {this.state.errorMessage}
              </AlertBox>
            )}
            <br />
            <div className="login_footer">
              <button
                type="submit"
                className="btn--publicis-primary login_button"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default EmailForPasswordReset;
