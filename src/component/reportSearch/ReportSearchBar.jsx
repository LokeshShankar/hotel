import React, { Component } from "react";
import "../../css/search/SearchBar.css";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import { AMENITIES } from "../utility/Constant";
import Select from "react-select";

class ReportSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      amenities: AMENITIES,
    };
  }

  selectValue = (e) => {
    this.props.searchState.infrastructure = e.key;
  };

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
    return (
      <div>
        <form className="searchBarcontainer">
          <div>
            <div className="searchBarInnerContainerDate">
              <div>
                <label for="fromDate" className="searchBarLabels">
                  From Date:
                </label>
                <Input
                  name="fromDate"
                  type="date"
                  value={this.props.searchState.fromDate}
                  onChange={this.props.setData}
                  className="searchBarInputDate"
                />
              </div>
            </div>

            <div className="searchBarInnerContainerDate">
              <div>
                <label className="searchBarLabels">To Date:</label>
              </div>
              <div>
                <Input
                  name="toDate"
                  type="date"
                  value={this.props.searchState.toDate}
                  onChange={this.props.setData}
                  className="searchBarInputDate"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerNumber">
              <div>
                <label className="searchBarLabels">From Rating:</label>
              </div>
              <div>
                <Input
                  name="fromRating"
                  type="number"
                  value={this.props.searchState.fromRating}
                  onChange={this.props.setData}
                  className="searchBarInputNumber"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerNumber">
              <div>
                <label className="searchBarLabels">To Rating:</label>
              </div>
              <div>
                <Input
                  name="toRating"
                  type="number"
                  value={this.props.searchState.toRating}
                  onChange={this.props.setData}
                  className="searchBarInputNumber"
                />
              </div>
            </div>
            <div className="searchBarInnerContainerLocation">
              <div>
                <label className="searchBarLabels">Infrastructure:</label>
              </div>
              <Select
                name="infrastructure"
                options={this.state.amenities}
                onChange={this.selectValue}
                displayValue="key"
                styles={this.customStyles}
                // className="searchBarInputLocation"
                placeholder="Select Infrastructure"
              />
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

export default ReportSearchBar;
