import React from "react";
import "../../css/utility/Dropdown.css";

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      options: ["option 1", "option 2", "option 3", "option 4"],
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    //    console.log(this.state.value);
  }

  render() {
    let options = this.state.options;
    return (
      <div>
        <label for="dropdown">Choose an option:</label>
        <br />
        <br />

        <select
          name="dropdown"
          id="standard-select"
          class="select"
          onChange={this.handleSelect}
        >
          <option value="Click to see options">Click to see options</option>

          {options.map(function (opName, index) {
            return (
              <option value={opName} key={index}>
                {opName}
              </option>
            );
          })}
        </select>
        <span class="focus"></span>

        <p>{this.state.value} </p>
      </div>
    );
  }
}

export default DropdownMenu;
