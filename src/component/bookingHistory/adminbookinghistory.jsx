import { Fragment, Component } from "react";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import Cookies from "universal-cookie/lib";
import axios from "axios";
import Pagination from "../paginationandreport/Pagination";
import BookingHistory from "./BookingHistory";
import "../../css/bookingHistory/BookingHistory.css";

class Adminbookinghistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      bookingtype: "currentbookings",
    };
  }
  componentDidMount() {
    this.getBookings("current");
  }
  getBookings = (tvalue) => {
    const URL =
      HOTEL_SERVICE_BASE_URL +
      "/booking/hotel/" +
      tvalue +
      "/" +
      this.props.location.state.hotelid;
    let jwtTokenCookie = new Cookies();
    axios
      .get(URL, {
        headers: {
          Authorization: jwtTokenCookie.get("jwtToken"),
        },
      })
      .then((response) => {
        this.setState({ bookings: response.data });
      })
      .catch((error) => {
        //        console.error(error);
      });
  };
  pastbooking = () => {
    this.setState({ bookingtype: "pastbookings" });
    this.getBookings("past");
  };
  currentbooking = () => {
    this.setState({ bookingtype: "currentbookings" });
    this.getBookings("current");
  };
  futurebooking = () => {
    this.setState({ bookingtype: "futurebookings" });
    this.getBookings("future");
  };
  render() {
    return (
      <>
        <div className="bookinghist_btngrp">
          <button
            value="past"
            className={`btn--publicis-primary bookinghist-btns ${
              this.state.bookingtype === "pastbookings"
                ? "bookinghist-active"
                : ""
            }`}
            onClick={this.pastbooking}
          >
            {" "}
            past bookings{" "}
          </button>
          <button
            value="current"
            className={`btn--publicis-primary bookinghist-btns ${
              this.state.bookingtype === "currentbookings"
                ? "bookinghist-active"
                : ""
            }`}
            onClick={this.currentbooking}
          >
            {" "}
            current bookings{" "}
          </button>
          <button
            value="future"
            className={`btn--publicis-primary bookinghist-btns ${
              this.state.bookingtype === "futurebookings"
                ? "bookinghist-active"
                : ""
            }`}
            onClick={this.futurebooking}
          >
            {" "}
            future bookings{" "}
          </button>
        </div>
        <div>
          <Pagination data={this.state.bookings}>
            <BookingHistory
              role="admin"
              bookingtype={this.state.bookingtype}
              history={this.props.history}
              hotelId={this.props.location.state.hotelid}
            />
          </Pagination>
        </div>
      </>
    );
  }
}

export default Adminbookinghistory;
