import React, { Component } from "react";
import { Input } from "../utility/Input";
import "../../css/register/Form.css";
import { connect } from "react-redux";

export class AddressForm extends Component {
  state = {
    address: this.props.address,
    pincode: this.props.pincode,
    city: this.props.city,
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.fillStateData({
      name: event.target.name,
      value: event.target.value.trim(),
    });
  };

  render() {
    return (
      <div>
        <div className="form-group-lg">
          <Input
            type="text"
            name="address"
            label="Address *"
            placeholder="House/Building, Street/Area"
            className="register_input"
            value={this.state.address}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["address"] &&
            this.props.errorMsg["address"] !== "" && (
              <p className="error-name-input">
                {this.props.errorMsg["address"]}
              </p>
            )}
        </div>
        <div className="form-group-lg">
          <Input
            type="text"
            name="city"
            label="City *"
            placeholder="Delhi"
            className="register_input"
            value={this.state.city}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["city"] &&
            this.props.errorMsg["city"] !== "" && (
              <p className="error-name-input">{this.props.errorMsg["city"]}</p>
            )}
        </div>
        <div className="form-group-lg">
          <Input
            type="text"
            name="pincode"
            label="Pin Code *"
            placeholder="123456"
            className="register_input"
            value={this.state.pincode}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["pincode"] &&
            this.props.errorMsg["pincode"] !== "" && (
              <p className="error-name-input">
                {this.props.errorMsg["pincode"]}
              </p>
            )}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    address: state.address,
    pincode: state.pincode,
    city: state.city,
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

// export default AddressForm;
export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
