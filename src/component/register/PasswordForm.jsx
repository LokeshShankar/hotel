import { Component } from "react";
import { Input } from "../utility/Input";
import "../../css/register/Form.css";
import { connect } from "react-redux";

export class PasswordForm extends Component {
  state = {
    password: this.props.password,
    confirmPassword: this.props.confirmPassword,
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value.trim() });
    this.props.fillStateData({
      name: event.target.name,
      value: event.target.value.trim(),
    });
  };

  render() {
    return (
      <div>
        <div class="form-group-lg">
          <Input
            type="password"
            name="password"
            label="New Password *"
            className="register_input"
            value={this.state.password}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["password"] &&
            this.props.errorMsg["password"] !== "" && (
              <p className="error-name-input">
                {this.props.errorMsg["password"]}
              </p>
            )}
        </div>
        <div class="form-group-lg">
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password *"
            className="register_input"
            value={this.state.confirmPassword}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["confirm_password"] &&
            this.props.errorMsg["confirm_password"] !== "" && (
              <p className="error-name-input">
                {this.props.errorMsg["confirm_password"]}
              </p>
            )}
        </div>
        <div class="pass_info">
          <strong>Password should have</strong>
          <ul>
            <li>Minimum 8 Characters</li>
            <li>Atleast 1 UpperCase Character</li>
            <li>Minimum 1 Digit (0-9)</li>
          </ul>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    password: state.password,
    confirmPassword: state.confirmPassword,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    fillStateData: (newStateVariable) =>
      dispatch({
        type: "FILL_DATA",
        payload: newStateVariable,
      }),
  };
};

// export default PasswordForm;
export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm);
