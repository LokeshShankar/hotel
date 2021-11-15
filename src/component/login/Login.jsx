import React from "react";
import axios from "axios";
import "../../css/login/login.css";
import logger from "../../logger";
import { Link } from "react-router-dom";
import {
  LOGIN_SERVICE_BASE_URL,
  USER_SERVICE_BASE_URL,
} from "../utility/Constant";
import { Alert } from "react-bootstrap";
import AlertBox from "../alertBox/AlertBox";
import { Snackbar } from "@material-ui/core";

const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
      isAuthenticated: false,
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

    // default values before submitting

    if (!EMAIL_PATTERN.test(this.state.user.email)) {
      this.setState({ errorMessage: "Enter a valid Email Id" });
      return;
    }
    const URL_LOGIN = LOGIN_SERVICE_BASE_URL + "/login";
    const URL_LOCK = USER_SERVICE_BASE_URL + "/user";
    axios
      .get(URL_LOCK + "/checkuser/" + this.state.user.email)
      .then((response) => {
        let user = response.data;
        if (user) {
          axios
            .get(URL_LOCK + "/lockedstatus/" + this.state.user.email)
            .then((response) => {
              let lockedstatus = response.data;
              if (lockedstatus) {
                //Account is locked
                this.setState({
                  errorMessage: "Account is locked.Contact Administrator",
                });
              } else {
                axios
                  .post(
                    URL_LOGIN,
                    {},
                    {
                      headers: {
                        username: this.state.user.email,
                        password: this.state.user.password,
                      },
                    }
                  )
                  .then(() => {
                    // user credentials are legit
                    this.setState({ isAuthenticated: true });

                    this.props.history.push({
                      pathname: "/otp",
                      state: {
                        email: this.state.user.email,
                      },
                    });
                  })
                  .catch(() => {
                    //                    console.info("Incorrect password");

                    this.setState({ errorMessage: "Invalid credentials." });

                    // Increase incorrect attempts
                    axios
                      .put(URL_LOCK + "/checkattempt/" + this.state.user.email)
                      .then((response) => {
                        let check = response.data;
                        if (check) {
                          this.setState({
                            errorMessage:
                              "Account is locked.Contact Administrator",
                          });
                          //                          console.info("Account is locked");
                        }
                      })
                      .catch((error) => {
                        //                        console.error(error);
                      });
                  });
              }
            })
            .catch((error) => {
              //              console.error(error);
            });
        } else {
          //          console.info("User doesn't exist");
          this.setState({ errorMessage: "User is not registered" });
        }
      })
      .catch((error) => {
        //        console.error(error);
      });
  };

  handleErrorClose = () => {
    this.setState({ errorMessage: "" });
  };

  render() {
    return (
      <div>
        <div className="login">
          <h2 className="login-header">Log in</h2>

          <form className="login--container">
            <input
              className="login_input"
              onChange={this.handleChange}
              name="email"
              type="email"
              id="email"
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
                Log In
              </button>
              <Link className="forgot_pass" to="/emailforpasswordreset">
                Forgot Password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
