import React from "react";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import "../../css/adminFun/admincomponent.css";

class HotelId extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hotelId: "", test: props.test };
  }

  updateNumber = (e) => {
    this.setState({ hotelId: e.target.value });
  };

  validHotelId = () => {
    let id = this.state.hotelId;
    var number_pattern = new RegExp(/^-?\d+$/);
    if (id ==="" || !number_pattern.test(id) || parseInt(id) <= 0) {
      return false;
    } else {
      return true;
    }
  };

  sendData = (event) => {
    event.preventDefault();
    if (this.validHotelId()) {
      if (this.props.func !== null) {
        this.props.func(this.state.hotelId);
      }
    } else {
      alert("Invalid hotelId");
    }
  };

  render() {
    return (
      <div className="admin-component hotel-box">
        <h2>{this.props.heading}</h2>
        <Input
          name="hotelId"
          className="myInput"
          labelClassName="hotelId"
          label="Enter hotel id "
          type="number"
          onChange={this.updateNumber}
        ></Input>
        <Button
          buttonSize="btn--medium"
          cssClassName="btn--primary--solid"
          label={this.props.label}
          handleClick={this.sendData}
        ></Button>
        {/* <p>{this.state.test}</p> */}
      </div>
    );
  }
}

export default HotelId;
