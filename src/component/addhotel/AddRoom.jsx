import React, { useState } from "react";
import Button from "../utility/Button";
import "../../css/adminFun/admincomponent.css";
import { Multiselect } from "multiselect-react-dropdown";
import Select from "react-select";
import { ROOMTYPES, INCLUSIONS } from "../utility/Constant";
import { Input } from "../utility/Input";

class NewRoom extends React.Component {
  //   const [inputList, setInputList] = useState([
  //     { roomtype: "", maxallowed: "", roomcount: "", price: "" },
  //   ]);

  constructor(props) {
    super(props);
    this.state = {
      inputList: [...this.props.roomList],
      roomtypes: ROOMTYPES,
      selectedValue: "",
      inclusions: INCLUSIONS,
      errors: {},
    };
  }

  selectValue = (e, index) => {
    const list = [...this.state.inputList];
    list[index]["roomtype"] = e.label;
    this.setState({ inputList: list });
  };

  // handle input change
  handleInputChange = (e, index) => {
    // if(e !== undefined && e.target !== undefined)
    const { name, value } = e.target;
    const list = [...this.state.inputList];
    list[index][name] = value;
    this.setState({ inputList: list });
  };

  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    const list = [...this.state.inputList];
    list.splice(index, 1);
    this.setState({ inputList: list });
    // this.state.inputList = list;
    // console.log(this.state);
  };

  // handle click event of the Add button

  checkError = (list) => {
    let roomtype = list.roomtype;
    let roomcount = list.roomcount;
    let price = list.price;
    let maxallowed = list.maxallowed;

    let noErrors = true;
    let errors = {};

    // Room type
    var roomtype_pattern = new RegExp(/^[a-zA-Z ]*$/);
    if (roomtype === "") {
      noErrors = false;
      errors["roomtype"] = "Room type can't be empty";
    } else if (!roomtype_pattern.test(roomtype)) {
      noErrors = false;
      errors["roomtype"] = "Invalid room type";
    }

    // Room count
    var number_pattern = new RegExp(/^-?\d+$/);
    if (roomcount === "") {
      noErrors = false;
      errors["roomcount"] = "Room count can't be empty";
    } else if (!number_pattern.test(roomcount) || parseInt(roomcount) < 0) {
      noErrors = false;
      errors["roomcount"] = "Invalid room count";
    }

    // Price
    if (price === "") {
      noErrors = false;
      errors["price"] = "Price can't be empty";
    } else if (!number_pattern.test(price) || parseInt(price) < 0) {
      noErrors = false;
      errors["price"] = "Invalid price";
    }

    // Max allowed
    if (maxallowed === "") {
      noErrors = false;
      errors["maxallowed"] = "Max persons allowed can't be empty";
    } else if (!number_pattern.test(maxallowed) || parseInt(maxallowed) < 0) {
      noErrors = false;
      errors["maxallowed"] = "Invalid Max Persons";
    }
    this.state.errors = errors;
    this.setState({ errors: errors });
    return noErrors;
  };

  handleAddClick = (event) => {
    event.preventDefault();
    let list = this.state.inputList[this.state.inputList.length - 1];

    if (this.checkError(list)) {
      this.setState({
        inputList: [
          ...this.state.inputList,
          {
            roomtype: "",
            maxallowed: "",
            roomcount: "",
            price: "",
            selectedInclusions: [],
          },
        ],
      });
    } else {
      // alert(JSON.stringify(this.state.errors));
    }

    // console.log(this.state.inputList);
  };

  multiSelect = (e, index) => {
    // console.warn(e.target);
    this.state.inputList[index].selectedInclusions = e;
    // console.warn(this.state.inputList[index].selectedInclusions);
  };

  onTrigger = (event) => {
    event.preventDefault();
    if (
      this.checkError(this.state.inputList[this.state.inputList.length - 1])
    ) {
      this.props.roomCallback(this.state.inputList);
    }
  };

  render() {
    return (
      <>
        {this.state.inputList.map((x, i) => {
          return (
            <div className="--form-card-publicis" key={i.toString()}>
              <div className="--form-card-publicis-header">Room Type</div>
              <div className="--form-card-publicis-body">
                <div className="--form-publicis-group">
                  <label>Enter Room type *</label>
                  <Select
                    className="newroom_form_select"
                    name="roomtype"
                    options={this.state.roomtypes}
                    placeholder={x.roomtype}
                    onChange={(e) => this.selectValue(e, i)}
                  />
                  {this.state.errors["roomtype"] &&
                    this.state.errors["roomtype"] !== "" && (
                      <p className="error-name-admin">
                        {this.state.errors["roomtype"]}
                      </p>
                    )}
                </div>
                <div className="--form-publicis-group">
                  <Input
                    label="Enter max persons *"
                    className="--form-publicis-input"
                    name="maxallowed"
                    placeholder="Enter max persons"
                    value={x.maxallowed}
                    onChange={(e) => this.handleInputChange(e, i)}
                  />
                  {this.state.errors["maxallowed"] &&
                    this.state.errors["maxallowed"] !== "" && (
                      <p className="error-name-admin">
                        {this.state.errors["maxallowed"]}
                      </p>
                    )}
                </div>
                <div className="--form-publicis-group">
                  <Input
                    name="roomcount"
                    label="Enter rooms available  *"
                    placeholder="Enter rooms available"
                    className="--form-publicis-input"
                    value={x.roomcount}
                    onChange={(e) => this.handleInputChange(e, i)}
                  />
                  {this.state.errors["roomcount"] &&
                    this.state.errors["roomcount"] !== "" && (
                      <p className="error-name-admin">
                        {this.state.errors["roomcount"]}
                      </p>
                    )}
                </div>
                <div className="--form-publicis-group">
                  <Input
                    label="Enter room price *"
                    className="--form-publicis-input"
                    placeholder="Enter room price"
                    name="price"
                    value={x.price}
                    onChange={(e) => this.handleInputChange(e, i)}
                  />
                  {this.state.errors["price"] &&
                    this.state.errors["price"] !== "" && (
                      <p className="error-name-admin">
                        {this.state.errors["price"]}
                      </p>
                    )}
                </div>
                <div className="--form-publicis-group">
                  <label>Enter Inclusions</label>
                  <div className="multiselect">
                    <Multiselect
                      options={this.state.inclusions}
                      displayValue="key"
                      onSelect={(e) => this.multiSelect(e, i)}
                      onRemove={(e) => this.multiSelect(e, i)}
                      selectedValues={x.selectedInclusions}
                    />
                  </div>
                </div>
                {this.state.inputList.length !== 1 && (
                  <Button
                    cssClassName="btn--publicis-secondary-outline admin-button"
                    label="Remove"
                    handleClick={() => this.handleRemoveClick(i)}
                  ></Button>
                )}
              </div>
            </div>
          );
        })}
        <div className="admin_new_hotel_btnGroup">
          <Button
            cssClassName="btn--publicis-secondary-outline admin-button2"
            label="Add Room Type"
            handleClick={this.handleAddClick}
          ></Button>
          <Button
            cssClassName="btn--publicis-primary admin-button2"
            label="Submit"
            handleClick={this.onTrigger}
          ></Button>
        </div>
      </>
    );
  }
}

export default NewRoom;
