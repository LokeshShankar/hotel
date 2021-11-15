import React, { Component } from "react";
import "../../css/search/SearchBar.css";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import Select from "react-select";
import { LOCATIONS } from "../utility/Constant";

class SearchBar extends Component {
  selectValue = (e) => {
    this.props.searchState.location = e.label;
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      locations: LOCATIONS,
    };
  }

  customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#fe414d",
      backgroundColor: "none",
      ":active": {
        backgroundColor: "#fe414d",
        color: "white",
      },
      ":hover": {
        backgroundColor: "#fe414d",
        color: "white",
      },
    }),
    control: () => ({
      border: "1px solid #fe414d",
      borderRadius: "5px",
      margin: "10px 1em 0 0",
      padding: "2px",
      display: "flex",
      fontWeight: "600",
      backgroundColor: "#fe414d",
      color: "white",
    }),
    input: () => ({ color: "white" }),
    placeholder: () => ({ color: "white" }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition, color: "white" };
    },
  };

  render() {
    let today = new Date();
    // let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    let date =
      today.getFullYear() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getDate();

    //    console.log(date);
    return (
      <div className="search-outer-container">
        <form className="searchBarcontainer">
          <div>
            <div className="searchBarInnerContainerLocation">
              <div>
                <label className="searchBarLabels">Location</label>
              </div>
              <div>
                <Select
                  id="searchLocationFilter"
                  name="location"
                  styles={this.customStyles}
                  options={this.state.locations}
                  onChange={this.selectValue}
                  displayValue="key"
                  placeholder="Select location"
                  // className="searchBarInputLocation"
                  // classNamePrefix = "css-yk16xz-control"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerDate">
              <div>
                <label className="searchBarLabels">Check-in</label>
              </div>
              <div>
                <Input
                  name="startDate"
                  type="date"
                  value={this.props.searchState.startDate}
                  onChange={this.props.setCheckInDate}
                  className="searchBarInputDate"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerDate">
              <div>
                <label className="searchBarLabels">Check-out</label>
              </div>
              <div>
                <Input
                  name="endDate"
                  type="date"
                  value={this.props.searchState.endDate}
                  onChange={this.props.setCheckOutDate}
                  className="searchBarInputDate"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerNumber">
              <div>
                <label className="searchBarLabels">Adults</label>
              </div>
              <div>
                <Input
                  name="adults"
                  type="number"
                  value={this.props.searchState.adults}
                  onChange={this.props.setAdults}
                  className="searchBarInputNumber"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerNumber">
              <div>
                <label className="searchBarLabels">Children</label>
              </div>
              <div>
                <Input
                  name="children"
                  type="number"
                  value={this.props.searchState.children}
                  onChange={this.props.setChildren}
                  className="searchBarInputNumber"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerNumber">
              <div>
                <label className="searchBarLabels">Rooms</label>
              </div>
              <div>
                <Input
                  name="rooms"
                  type="number"
                  value={this.props.searchState.rooms}
                  onChange={this.props.setRooms}
                  className="searchBarInputNumber"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerSearch">
              <div>
                <Button
                  type="button"
                  cssClassName="btn--publicis-secondary-outline"
                  handleClick={this.props.search}
                  label="SEARCH"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
