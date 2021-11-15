import { lazy, Component, Suspense } from "react";
import "../../css/register/Register.css";
import Button from "../utility/Button";
import DetailsForm from "./DetailsForm";
import { connect } from "react-redux";
import axios from "axios";
import { USER_SERVICE_BASE_URL } from "../utility/Constant";
const PasswordForm = lazy(() => import("./PasswordForm"));
const AddressForm = lazy(() => import("./AddressForm"));
const Message = lazy(() => import("../utility/Message"));

const NAME_PATTERN = /^[a-zA-Z ]+$/;
const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_PATTERN = /^\d{10}$/;
const BIRTHYEAR_PATTERN = /^\d{4}$/;
const PINCODE_PATTERN = /^\d{6}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d.,@$&]{8,}$/;

const REGISTER_URL = USER_SERVICE_BASE_URL + "/user/add";
const initialState = {
  step: 1,
  error: false,
  errorMsg: {},
  disable: false,
  disableMessage: "",
};

export class RegisterCard extends Component {
  state = {
    ...initialState,
    successMsg: "",
    errMsg: "",
  };

  // Validates DetailsForm
  validateDetails = () => {
    let error = false;
    let errorMsg = {};
    if (this.props.roleVisible) {
      if (this.props.groupNameList.indexOf(this.props.groupName) === -1) {
        this.setState({ error: true, errorMsg: "Select Role from dropdown" });
        return false;
      }
    }
    if (!NAME_PATTERN.test(this.props.firstName)) {
      error = true;
      if (this.props.firstName === "")
        errorMsg["firstName"] = "First name can't be empty";
      else errorMsg["firstName"] = "First name must contains only characters";
    }
    if (!NAME_PATTERN.test(this.props.lastName)) {
      error = true;
      if (this.props.lastName === "")
        errorMsg["lastName"] = "Last name can't be empty";
      else errorMsg["lastName"] = "last name must contains only characters";
    }
    if (!EMAIL_PATTERN.test(this.props.email)) {
      error = true;
      if (this.props.email === "") errorMsg["email"] = "Email can't be empty";
      else errorMsg["email"] = "Invalid email address";
    }
    if (!PHONE_PATTERN.test(this.props.phone)) {
      error = true;
      if (this.props.phone === "") errorMsg["phone"] = "Phone can't be empty";
      else errorMsg["phone"] = "Phone no. should be of 10 digits";
    }
    if (!BIRTHYEAR_PATTERN.test(this.props.yearOfBirth)) {
      error = true;
      if (this.props.yearOfBirth === "")
        errorMsg["yearOfBirth"] = "Birth year can't be empty";
      else errorMsg["yearOfBirth"] = "Invalid birth year";
    } else {
      const currentYear = new Date().getFullYear();
      if (currentYear - parseInt(this.props.yearOfBirth) < 18) {
        error = true;
        errorMsg["yearOfBirth"] = "Only 18 years and above can register";
      }
    }
    this.setState({ error: error, errorMsg: errorMsg });
    return !error;
  };

  // Validates AddressForm
  validateAddress = () => {
    let error = false;
    let errorMsg = {};
    if (this.props.address === "") {
      error = true;
      errorMsg["address"] = "Address can't be empty";
    }
    if (!NAME_PATTERN.test(this.props.city)) {
      error = true;
      if (this.props.city === "")
        errorMsg["city"] = "City field can't be empty";
      else errorMsg["city"] = "City field must contains only characters";
    }
    if (!PINCODE_PATTERN.test(this.props.pincode)) {
      error = true;
      if (this.props.pincode === "")
        errorMsg["pincode"] = "Pincode can't be empty";
      else errorMsg["pincode"] = "Pincode must be 6 digit number";
    }
    this.setState({ error: error, errorMsg: errorMsg });
    return !error;
  };

  // Validates PasswordForm
  validatePassword = () => {
    let error = false;
    let errorMsg = {};
    if (!PASSWORD_PATTERN.test(this.props.password)) {
      error = true;
      if (this.props.password === "")
        errorMsg["password"] = "Password can't be empty";
      else errorMsg["password"] = "Password is NOT Valid";
    } else if (this.props.confirmPassword !== this.props.password) {
      error = true;
      errorMsg["confirm_password"] =
        "New Password and confirm password didn't match";
    }

    this.setState({ error: error, errorMsg: errorMsg });
    return !error;
  };

  // Form Submit Button -> Goes to Next form And Submits after last form
  nextStep = (event) => {
    event.preventDefault();

    // Next Button Clicked on Details Form
    if (this.state.step === 1) {
      if (this.validateDetails()) {
        this.setState((prevState) => ({
          step: prevState.step + 1,
        }));
      }
    }
    // Next Button Clicked on Address Form
    else if (this.state.step === 2) {
      if (this.validateAddress()) {
        this.setState((prevState) => ({
          step: prevState.step + 1,
        }));
      }
    }
    //  Submit Button Clicked on Password Form
    else if (this.state.step === 3) {
      if (this.validatePassword()) {
        this.setState({ disable: true, disableMessage: "Registering..." });
        const userData = {
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          password: this.props.password,
          phone: parseInt(this.props.phone),
          yearOfBirth: parseInt(this.props.yearOfBirth),
          accountLocked: false,
          address: this.props.address,
          pinCode: parseInt(this.props.pincode),
          city: this.props.city,
          groupName: this.props.groupName,
        };
        if (!this.props.roleVisible) {
          userData.groupName = "customer";
        }
        // axios call to register User
        axios
          .post(REGISTER_URL, userData)
          .then((response) => {
            alert(response.data);
            let msg =
              "Hi " + this.props.firstName + ", Registration successful !";
            this.setState({ successMsg: msg });
            this.props.clearState();
            this.setState({ ...initialState });
            this.props.history.push({
              pathname: "/signin"
            });
          })
          .catch((error) => {
            let msg =
              "So Sorry " +
              this.props.firstName +
              ", Registration is unsuccessful.You have to retry again !";
            this.setState({ errMsg: msg });
            this.props.clearState();
            this.setState({ ...initialState });
          });
      }
    }
  };

  // Goes Back to Previous Form
  prevStep = () => {
    if (this.state.step !== 1) {
      this.setState((prevState) => ({
        step: prevState.step - 1,
      }));
    }
  };

  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div class="registerCard">
          {this.state.successMsg !== "" && (
            <div class="registerSuccess">
              <div class="registerSuccessMessage">{this.state.successMsg}</div>
            </div>
          )}
          {this.state.errMsg !== "" && (
            <div class="registerError">
              <div class="registerErrorMessage">{this.state.errMsg}</div>
            </div>
          )}
          {this.state.disable && (
            <div className="registerDisable">
              <div className="registerDisableMessage">
                {this.state.disableMessage}
              </div>
            </div>
          )}
          <div className="registerHeader">SIGN UP</div>
          <form method="POST">
            <div class="registerBody">
              {this.state.step === 1 && (
                <DetailsForm
                  roleVisible={this.props.roleVisible}
                  errorMsg={this.state.errorMsg}
                  error={this.state.error}
                ></DetailsForm>
              )}
              {this.state.step === 2 && (
                <AddressForm
                  errorMsg={this.state.errorMsg}
                  error={this.state.error}
                ></AddressForm>
              )}
              {this.state.step === 3 && (
                <PasswordForm
                  errorMsg={this.state.errorMsg}
                  error={this.state.error}
                ></PasswordForm>
              )}
            </div>
            <div className="registerFooter">
              {this.state.step !== 1 && (
                <Button
                  label="Back"
                  cssClassName="btn--publicis-secondary-outline registerButton"
                  handleClick={this.prevStep}
                  type="button"
                ></Button>
              )}
              <Button
                label={this.state.step !== 3 ? "Next" : "Sign Up"}
                cssClassName="btn--publicis-primary registerButton"
                handleClick={this.nextStep}
                type="submit"
              ></Button>
            </div>
          </form>
        </div>
      </Suspense>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    phone: state.phone,
    yearOfBirth: state.yearOfBirth,
    groupName: state.groupName,
    address: state.address,
    pincode: state.pincode,
    city: state.city,
    password: state.password,
    confirmPassword: state.confirmPassword,
    groupNameList: state.groupNameList,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    clearState: () =>
      dispatch({
        type: "CLEAR_STATE",
      }),
  };
};

// export default RegisterCard;
export default connect(mapStateToProps, mapDispatchToProps)(RegisterCard);
