import React from "react";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import "../../css/commission-ui/DisplayCommission.css";
import CommissionData from "./CommissionData";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";

class DisplayCommission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commission: null,
      selectedYear: "select year",
      selectedMonth: "select month",
      count1: 0,
      currentYear: "",
      currentMonth: "",
      today: new Date(),
      months: [
        "Janaury",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: [2015],
      commissionYear: "",
      commissionMonth: "",
    };
  }

  handleClick = () => {
    let i = 0,
      cnt = 0;
    while (i < 12) {
      if (this.state.selectedMonth == this.state.months[i]) break;
      i++;
      cnt++;
    }
    if (
      this.state.currentYear == this.state.selectedYear &&
      this.state.currentMonth <= cnt
    ) {
      alert("No data for the selected month");
    } else if (
      this.state.selectedYear == "select year" &&
      this.state.selectedMonth == "select month"
    ) {
      alert("please select month and year");
    } else if (this.state.selectedMonth == "select month") {
      alert("please select month");
    } else if (this.state.selectedYear == "select year") {
      alert("please select year");
    } else {
      let jwtTokenCookie = new Cookies();
      let URL =
        HOTEL_SERVICE_BASE_URL +
        "/commission/" +
        this.props.location.state.hotelId +
        "/period/" +
        this.state.selectedYear +
        "/" +
        (cnt + 1);

      axios
        .get(URL, {
          headers: {
            Authorization: jwtTokenCookie.get("jwtToken"),
          },
        })
        .then((res) => {
          if (res.data) {
            //                        console.log(res.data);
            this.setState({
              commission: res.data,
              count1: cnt,
              commissionMonth: this.state.selectedMonth,
              commissionYear: this.state.selectedYear,
            });
          }
        })
        .catch((error) => {
          alert("Network Error Try Again!");
        });
    }
  };

  handleChangeMonth = (event) => {
    this.setState({ selectedMonth: event.target.value });
  };

  handleChangeYear = (event) => {
    this.setState({ selectedYear: event.target.value });
  };

  componentDidMount() {
    let years = [2015];
    for (let i = 2016; i <= this.state.today.getFullYear(); i++) {
      years.push(i);
    }
    this.setState({
      currentMonth: this.state.today.getMonth(),
      currentYear: this.state.today.getFullYear(),
      years: years,
    });
  }
  render() {
    return (
      <>
        <div className="commission-div">
          <span className="options">
            <select
              id="monthdrop"
              className="commission-dropdown"
              name="selectedMonth"
              value={this.state.selectedMonth}
              onChange={this.handleChangeMonth}
            >
              <option className="drop-option">select month</option>
              {this.state.months.map((month) => (
                <option className="drop-option" key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </span>
          <span className="options">
            <select
              id="yeardrop"
              className="commission-dropdown"
              name="selectedYear"
              value={this.state.selectedYear}
              onChange={this.handleChangeYear}
            >
              <option className="drop-option">select year</option>
              {this.state.years.map((year) => (
                <option className="drop-option" key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </span>
          <span className="options">
            <input
              type="button"
              className="search-btn"
              onClick={this.handleClick}
              value="SEARCH"
            />
          </span>
        </div>
        <div className="com-hr"></div>
        <CommissionData
          commission={this.state.commission}
          month={this.state.commissionMonth}
          year={this.state.commissionYear}
        />
      </>
    );
  }
}

export default DisplayCommission;
