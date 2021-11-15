import React, { Component } from "react";
import { Input } from "../utility/Input";
import "../../css/register/Form.css";
import { connect } from "react-redux";
import axios from "axios";
import { USER_SERVICE_BASE_URL } from "../utility/Constant";

const USER_GROUPS = ["customer", "admin"];

const GET_GROUPS_URL = USER_SERVICE_BASE_URL + "/user/usergroups";

export class DetailsForm extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email,
    phone: this.props.phone,
    yearOfBirth: this.props.yearOfBirth,
    groupName: this.props.groupName,
    groupNameList: this.props.groupNameList,
  };

  constructor(props) {
    super(props);
    if (this.props.roleVisible) {
      if (this.props.groupNameList === null) {
        // axios call to fetch user groups
        // let user_groups = null;
        // axios
        //   .get(GET_GROUPS_URL)
        //   .then((response) => {
        //     console.log(response.data);
        //     user_groups = response.data;
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });

        // this.state = { ...this.state, groupNameList: user_groups };
        this.state = { ...this.state, groupNameList: USER_GROUPS };
        // this.props.fillUserGroups(user_groups);
        this.props.fillUserGroups(USER_GROUPS);
      }
    }
    // console.log(this.state);
  }

  onInputChange = (event) => {
    //to get the input field value
    let fieldValue = event.target.value;
    //to remove the multiple spaces between the words received as input
    let fieldValue1 = fieldValue.replace(/\s+/g, " ");
    // trim() will remove beginning and ending space
    this.setState({ [event.target.name]: fieldValue1 });
    this.props.fillStateData({
      name: event.target.name,
      value: fieldValue1.trim(),
    });
  };

  render() {
    return (
      <div>
        {this.props.roleVisible && (
          <div className="form-group-lg">
            <label htmlFor="groupName">Role</label>
            <select
              name="groupName"
              id="groupName"
              onChange={this.onInputChange}
              value={this.state.groupName}
            >
              <option key="" value="">
                Select from dropdown
              </option>
              {this.state.groupNameList.map((element) => {
                return (
                  <option key={element} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <div className="form-group-lg">
          <Input
            type="text"
            name="firstName"
            label="First Name *"
            placeholder="Bruce"
            className="register_input"
            value={this.state.firstName}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["firstName"] &&
            this.props.errorMsg["firstName"] !== "" && (
              <p className="error-name-input">
                {this.props.errorMsg["firstName"]}
              </p>
            )}
        </div>
        <div className="form-group-lg">
          <Input
            type="text"
            name="lastName"
            label="Last Name *"
            placeholder="Wayne"
            className="register_input"
            value={this.state.lastName}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["lastName"] &&
            this.props.errorMsg["lastName"] !== "" && (
              <p className="error-name-input">
                {this.props.errorMsg["lastName"]}
              </p>
            )}
        </div>
        <div className="form-group-lg">
          <Input
            type="text"
            name="email"
            label="Email *"
            className="register_input"
            placeholder="bruce.wayne@domain.com"
            value={this.state.email}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["email"] &&
            this.props.errorMsg["email"] !== "" && (
              <p className="error-name-input">{this.props.errorMsg["email"]}</p>
            )}
        </div>
        <div className="form-group-lg">
          <Input
            type="text"
            name="phone"
            label="Phone *"
            placeholder="9876543210"
            className="register_input"
            value={this.state.phone}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["phone"] &&
            this.props.errorMsg["phone"] !== "" && (
              <p className="error-name-input">{this.props.errorMsg["phone"]}</p>
            )}
        </div>
        <div className="form-group-lg">
          <Input
            type="text"
            name="yearOfBirth"
            label="Birth Year *"
            placeholder="1999"
            className="register_input"
            value={this.state.yearOfBirth}
            onChange={this.onInputChange}
          ></Input>
          {this.props.errorMsg["yearOfBirth"] &&
            this.props.errorMsg["yearOfBirth"] !== "" && (
              <p className="error-name-input">
                {this.props.errorMsg["yearOfBirth"]}
              </p>
            )}
        </div>
      </div>
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
    groupNameList: state.groupNameList,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    fillStateData: (newStateVariable) =>
      dispatch({
        type: "FILL_DATA",
        payload: newStateVariable,
      }),
    fillUserGroups: (userGroups) =>
      dispatch({
        type: "FILL_USER_GROUPS",
        payload: userGroups,
      }),
  };
};

// export default DetailsForm;
export default connect(mapStateToProps, mapDispatchToProps)(DetailsForm);
