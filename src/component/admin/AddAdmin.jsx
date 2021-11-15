import React from "react";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import "../../css/adminFun/addadmin.css";
import "../../css/utility/button.css";
import axios from "axios";
import Message from "../utility/Message";
import { USER_SERVICE_BASE_URL } from "../utility/Constant";
class AddAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      afname: "",
      alname: "",
      alocal_address: "",
      apin_code: "",
      acity: "",
      aemail: "",
      aphone: "",
      ayear_of_birth: "",
      apassword: "",
      errors: {},
      response: "",
      err: "",
    };
  }
  // if(afname === ''){
  //   errors["fname"] = "First name can't be empty";
  // }
  updateChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  checkErrorsAdmin = (event) => {
    let noErrors = true;
    let errors = {};
    // first name
    if (this.state.afname === "") {
      noErrors = false;
      errors["fname"] = "First name can't be empty";
    }
    // last name
    if (this.state.alname === "") {
      noErrors = false;
      errors["lname"] = "Last name can't be empty";
    }
    // local address
    if (this.state.alocal_address === "") {
      noErrors = false;
      errors["local_address"] = "Local address can't be empty";
    }
    // city
    if (this.state.acity === "") {
      noErrors = false;
      errors["city"] = "city can't be empty";
    }
    // pin
    if (this.state.apin_code === "") {
      noErrors = false;
      errors["pin_code"] = "PinCode can't be empty";
    }
    // password
    if (this.state.apassword === "") {
      noErrors = false;
      errors["password"] = "Password can't be empty";
    }
    // year of birth
    if (this.state.ayear_of_birth === "") {
      noErrors = false;
      errors["year_of_birth"] = "Year can't be empty";
    }
    // phone no
    if (this.state.aphone === "") {
      noErrors = false;
      errors["phone_no"] = "Phone no can't be empty";
    } else {
      // let phoneno = /^\\d{10}$/;
      var pattern = new RegExp(/^[0-9]{10}$/);
      if (!pattern.test(this.state.aphone)) {
        // alert("Invalid phone no");
        noErrors = false;
        errors["phone_no"] = "Invalid phone no";
      }
    }
    // email
    if (this.state.aemail === "") {
      noErrors = false;
      errors["email"] = "Email address can't be empty";
    } else {
      pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.aemail)) {
        noErrors = false;
        errors["email"] = "Invalid email id";
      }
    }
    // this.state.errors = errors
    this.setState({ errors });
    return noErrors;
  };
  submitAdminDetails = async (event) => {
    event.preventDefault();
    if (this.checkErrorsAdmin(event)) {
      let object = {
        firstName: this.state.afname,
        lastName: this.state.alname,
        address: this.state.alocal_address,
        pinCode: this.state.apin_code,
        city: this.state.acity,
        email: this.state.aemail,
        password: this.state.apassword,
        phone: this.state.aphone,
        yearOfBirth: this.state.ayear_of_birth,
      };
      //      console.log(object);
      let admin_url = USER_SERVICE_BASE_URL + "/admin/";
      await axios
        .post(admin_url + "add/", object)
        .then((response) => {
          this.setState({ response: response.data });
          alert("Admin Details inserted");
          this.props.history.push("/admin");
        })
        .catch((error) => {
          //          console.log(error + " this is error");
          this.state.err = error;
          //this.setState({err:error})
        });
    } else {
      //      console.log(this.state.errors);
      //alert(JSON.stringify(this.state.errors));
    }
  };
  render() {
    return (
      <div className="--form-card-publicis">
        <form action="">
          {/* <h2>Admin Details</h2> */}
          <div className="--form-card-publicis-header">Admin Details</div>
          <div className="--form-card-publicis-body">
            <div className="--form-publicis-group">
              <Input
                name="afname"
                // className="myInput"
                className="--form-publicis-input"
                label="First Name *"
                placeholder="First Name"
                value={this.state.afname}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["fname"] &&
                this.state.errors["fname"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["fname"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="alname"
                // className="myInput"
                className="--form-publicis-input"
                label="Last Name *"
                placeholder="Last Name"
                value={this.state.alname}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["lname"] &&
                this.state.errors["lname"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["lname"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="alocal_address"
                // className="myInput"
                className="--form-publicis-input"
                placeholder="Local Address"
                label="Local Address *"
                value={this.state.alocal_address}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["local_address"] &&
                this.state.errors["local_address"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["local_address"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="apin_code"
                // className="myInput"
                className="--form-publicis-input"
                label="Pin Code *"
                placeholder="Pin Code"
                value={this.state.apin_code}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["pin_code"] &&
                this.state.errors["pin_code"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["pin_code"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="acity"
                // className="myInput"
                className="--form-publicis-input"
                label="City *"
                placeholder="City"
                value={this.state.acity}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["city"] &&
                this.state.errors["city"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["city"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="aemail"
                // className="myInput"
                className="--form-publicis-input"
                placeholder="Email"
                label="Email *"
                value={this.state.aemail}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["email"] &&
                this.state.errors["email"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["email"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="apassword"
                placeholder="Password"
                // className="myInput"
                className="--form-publicis-input"
                type="password"
                label="Password *"
                value={this.state.apassword}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["password"] &&
                this.state.errors["password"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["password"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="aphone"
                // className="myInput"
                className="--form-publicis-input"
                label="Phone *"
                placeholder="Phone"
                value={this.state.aphone}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["phone_no"] &&
                this.state.errors["phone_no"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["phone_no"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="ayear_of_birth"
                // className="myInput"
                className="--form-publicis-input"
                placeholder="Year of Birth"
                label="Year of Birth *"
                value={this.state.ayear_of_birth}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["year_of_birth"] &&
                this.state.errors["year_of_birth"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["year_of_birth"]}
                  </p>
                )}
            </div>
            <Button
              // buttonSize="btn--medium"
              // cssClassName="btn--primary--solid"
              cssClassName="btn--publicis-primary bill_entry_button"
              label="Submit"
              handleClick={this.submitAdminDetails}
            ></Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddAdmin;
