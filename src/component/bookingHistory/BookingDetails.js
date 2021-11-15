import axios from "axios";
import { Component } from "react";
import Cookies from "universal-cookie/lib";
import {
  HOTEL_SERVICE_BASE_URL,
  PAYMENT_INITIATE_URL,
  PAYMENT_REFUND_INITIATE_URL,
} from "../utility/Constant";
import Button from "../utility/Button";
import { Link } from "react-router-dom";

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    // paymentId and BokingId
    let paymentId = this.props.booking.paymentId;
    let bookingId = this.props.booking.bookingId;
    if (window.confirm("Do you want to cancel the booking?")) {
      //      console.log("cancel booking");
      const jwtTokenCookie = new Cookies();
      let jwtToken = jwtTokenCookie.get("jwtToken");
      axios.post(
        PAYMENT_REFUND_INITIATE_URL + paymentId
        // "http://hotelmanagement-1089400967.us-east-1.elb.amazonaws.com/payment-service/payment/refund/initiate/" +
        //   paymentId
      );
      axios
        .put(
          HOTEL_SERVICE_BASE_URL + "/booking/cancel/" + bookingId,
          // "http://hotelmanagement-1089400967.us-east-1.elb.amazonaws.com/hotel-service/booking/cancel/" +
          //   bookingId,
          {},
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        )
        .then((res) => {
          alert(res.data);
          this.props.history.go(0);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  generateInvoice = () => {
    this.props.history.push({
      pathname: "/invoice",
      state: {
        bookingId: this.props.booking.bookingId,
      },
    });
  };

  render() {
    let room = JSON.parse(this.props.booking.roomsBooked.replace(/'/g, '"'));
    return (
      <div
        key={this.props.booking.bookingId}
        className="--form-card-publicis root-type-media"
      >
        <div className="--form-card-publicis-header">
          {this.props.role === "user" ? (
            this.props.booking.hotelName
          ) : (
            <span>Booking ID : {this.props.booking.bookingId}</span>
          )}
        </div>
        <div className="--form-card-publicis-body">
          {this.props.role === "admin" && (
            <>
              <div className="--form-publicis-group">
                <label htmlFor="UiPage">Customer Name:</label>
                <input
                  className="--form-publicis-input"
                  value={
                    this.props.booking.firstName +
                    " " +
                    this.props.booking.lastName
                  }
                  disabled
                ></input>
              </div>
            </>
          )}
          <div className="--form-publicis-group">
            <label htmlFor="UiPage">No. Of Guests</label>
            <input
              className="--form-publicis-input"
              value={this.props.booking.guestCount}
              disabled
            ></input>
          </div>
          <div className="roomsBookedhistory_roomtypes_whole">
            <div className="roomsBookedhistory_heading">Rooms Booked</div>
            <div className="roomsBookedhistory_flexbox">
              {Object.keys(room).map((key, index) => (
                <div key={index} className="roomBookshistory_roomtype">
                  <div className="roomBookshistory_roomtype_header">{key}</div>
                  <div className="roomBookshistory_roomtype_body">
                    No of Rooms:<span> </span>
                    {room[key]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bookingHistory_bookingDetails_whole">
            <div className="bookingHistory_bookingDetails_elem">
              <label htmlFor="UiPage">Booking Date</label>
              <p>{this.props.booking.bookingTime.substring(0, 10)}</p>
            </div>
            <div className="bookingHistory_bookingDetails_elem">
              <label htmlFor="UiPage">Check-in Date</label>
              <p>{this.props.booking.checkInDate.substring(0, 10)}</p>
            </div>
            <div className="bookingHistory_bookingDetails_elem">
              <label htmlFor="UiPage">Check-out Date</label>
              <p>{this.props.booking.checkOutDate.substring(0, 10)}</p>
            </div>
            {this.props.role === "user" && (
              <>
                <div className="bookingHistory_bookingDetails_elem">
                  <label htmlFor="UiPage">Booking Status</label>
                  <p>{this.props.booking.status}</p>
                </div>
              </>
            )}
            {this.props.role === "admin" &&
              this.props.booking.status.toLowerCase() !== "failed" && (
                <>
                  <div className="bookingHistory_bookingDetails_elem">
                    <label htmlFor="UiPage">Booking Status</label>
                    <p>{this.props.booking.status}</p>
                  </div>
                </>
              )}
          </div>

          {/* Buttons */}
          <div className="bookingHistory_buttons_whole">
            {this.props.role === "user" &&
              this.props.booking.status.toLowerCase() !== "cancelled" &&
              new Date(this.props.booking.checkOutDate.substring(0, 10)) <=
                new Date() && (
                <button
                  className="btn--publicis-primary"
                  onClick={this.generateInvoice}
                >
                  Generate Invoice
                </button>
              )}
            {this.props.role === "user" &&
              this.props.booking.status.toLowerCase() !== "cancelled" &&
              new Date(this.props.booking.checkInDate.substring(0, 10)) >
                new Date() && (
                <button
                  className="btn--publicis-primary"
                  onClick={this.handleClick}
                >
                  Cancel Booking
                </button>
              )}
            {this.props.role === "admin" &&
              this.props.bookingtype === "currentbookings" && (
                <>
                  <Button
                    cssClassName="btn--publicis-primary"
                    label="Add Bill"
                    handleClick={() => {
                      this.props.history.push({
                        pathname: "/admin/billEntry",
                        state: {
                          bookingId: this.props.booking.bookingId,
                          hotelId: this.props.hotelId,
                        },
                      });
                    }}
                  />
                </>
              )}
            {this.props.role === "admin" &&
              (this.props.bookingtype === "currentbookings" ||
                this.props.bookingtype === "pastbookings") && (
                <>
                  <Button
                    // buttonSize="btn--medium"
                    // cssClassName="btn--primary--solid"
                    cssClassName="btn--publicis-primary"
                    label="All Bills"
                    handleClick={() => {
                      this.props.history.push({
                        pathname: "/admin/allbills",
                        state: {
                          bookingId: this.props.booking.bookingId,
                          hotelId: this.props.hotelId,
                        },
                      });
                    }}
                  />
                </>
              )}
            {this.props.role === "admin" &&
              this.props.bookingtype === "futurebookings" && (
                <>
                  <Button
                    // buttonSize="btn--medium"
                    // cssClassName="btn--primary--solid"
                    cssClassName="btn--publicis-primary"
                    label="Check-In"
                    handleClick={() => {
                      this.props.history.push({
                        pathname: "/admin/checkin",
                        state: {
                          bookingId: this.props.booking.bookingId,
                          hotelId: this.props.hotelId,
                        },
                      });
                    }}
                  />
                </>
              )}
            {this.props.role === "admin" &&
              this.props.bookingtype === "currentbookings" && (
                <>
                  <Button
                    // buttonSize="btn--medium"
                    // cssClassName="btn--primary--solid"
                    cssClassName="btn--publicis-primary"
                    label="Check-Out"
                    handleClick={() => {
                      this.props.history.push({
                        pathname: "/admin/checkout",
                        state: {
                          bookingId: this.props.booking.bookingId,
                          hotelId: this.props.hotelId,
                        },
                      });
                    }}
                  />
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default BookDetails;
