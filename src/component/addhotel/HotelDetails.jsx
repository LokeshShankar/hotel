import React from "react";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import "../../css/adminFun/admincomponent.css";
import "../../css/utility/button.css";
import UploadImage from "./UploadImage";

class HotelDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hname: props.hname,
      hphone: props.hphone,
      hemail: props.hemail,
      htax: props.htax,
      checkInTime: props.checkInTime,
      checkOutTime: props.checkOutTime,
      hotelImages: props.hotelImages,
      errors: {},
    };
  }

  updateChange = (event) => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value });
  };

  checkErrorsHotel = (event) => {
    let noErrors = true;
    let errors = {};
    let pattern;
    // Name
    if (this.state.hname === "") {
      noErrors = false;
      errors["hname"] = "Hotel name can't be empty";
    }

    // Phone
    if (this.state.hphone === "") {
      noErrors = false;
      errors["hphone"] = "Phone no can't be empty";
    } else {
      // let phoneno = /^\\d{10}$/;
      pattern = new RegExp(/^[0-9]{10}$/);
      if (!pattern.test(this.state.hphone)) {
        // alert("Invalid phone no");
        noErrors = false;
        errors["hphone"] = "Invalid phone no";
      }
    }

    // Email
    if (this.state.hemail === "") {
      noErrors = false;
      errors["hemail"] = "Email Id can't be empty";
    } else {
      pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.hemail)) {
        // alert("Invalid email id");
        noErrors = false;
        errors["hemail"] = "Invalid email id";
      }
    }

    // Tax
    var tax_pattern = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/);
    if (this.state.htax === "") {
      noErrors = false;
      errors["htax"] = "Tax rate can't be empty";
    } else if (!tax_pattern.test(this.state.htax)) {
      // alert("message tax");
      noErrors = false;
      errors["htax"] = "Invalid tax";
    } else {
      let tax = parseFloat(this.state.htax);
      if (tax < 0 || tax > 30) {
        // alert("message tax value");
        noErrors = false;
        errors["htax"] = "Invalid tax";
      }
    }

    if (this.state.checkInTime === "") {
      noErrors = false;
      errors["checkInTime"] = "Checkin time can't be empty";
    }

    if (this.state.checkOutTime === "") {
      noErrors = false;
      errors["checkOutTime"] = "checkout time time can't be empty";
    }
    this.setState({ errors: errors });
    return noErrors;
  };

  addressDetails = (event) => {
    event.preventDefault();
    if (this.checkErrorsHotel(event)) {
      // console.log(this.state);
      this.props.hotelDetailsCallback(this.state);
    }
  };

  hotelImagesCallback = (hotelImages) => {
    //    console.log(hotelImages);
    this.setState({ hotelImages: hotelImages });
  };

  render() {
    //    console.log(this.state);
    return (
      <div className="--form-card-publicis">
        <form action="">
          <div className="--form-card-publicis-header">Hotel Detail</div>
          <div className="--form-card-publicis-body">
            <div className="--form-publicis-group">
              <Input
                name="hname"
                className="--form-publicis-input"
                label="Hotel Name *"
                placeholder="Hotel Name"
                value={this.state.hname}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["hname"] &&
                this.state.errors["hname"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["hname"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="hphone"
                className="--form-publicis-input"
                placeholder="Phone"
                label="Phone *"
                value={this.state.hphone}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["hphone"] &&
                this.state.errors["hphone"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["hphone"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="hemail"
                className="--form-publicis-input"
                label="Email *"
                placeholder="Email"
                value={this.state.hemail}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["hemail"] &&
                this.state.errors["hemail"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["hemail"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="htax"
                className="--form-publicis-input"
                label="Tax rate *"
                placeholder="Tax rate"
                value={this.state.htax}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["htax"] &&
                this.state.errors["htax"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["htax"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="checkInTime"
                type="time"
                className="--form-publicis-input"
                placeholder="YYYY-MM-DD"
                label="Check in *"
                value={this.state.checkInTime}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["checkInTime"] &&
                this.state.errors["checkInTime"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["checkInTime"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="checkOutTime"
                type="time"
                className="--form-publicis-input"
                placeholder="YYYY-MM-DD"
                label="Check out *"
                value={this.state.checkOutTime}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["checkOutTime"] &&
                this.state.errors["checkOutTime"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["checkOutTime"]}
                  </p>
                )}
            </div>
            <UploadImage
              hotelImages={this.state.hotelImages}
              hotelImagesCallback={this.hotelImagesCallback}
            />

            <Button
              cssClassName="btn--publicis-primary admin-button"
              label="Next"
              handleClick={this.addressDetails}
            ></Button>
          </div>
        </form>
      </div>
    );
  }
}

export default HotelDetails;
