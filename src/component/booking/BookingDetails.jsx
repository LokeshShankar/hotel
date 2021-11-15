import React from "react";
import axios from "axios";
import RoomDetails from "./RoomDetails";
import Button from "../utility/Button";
import "../../css/adminFun/admincomponent.css";
import "../../css/booking/bookingdetails.css";
import {
  BOOKING_URL,
  PAYMENT_INITIATE_URL,
  PAYMENT_SUCCESSFUL_URL,
  PAYMENT_REFUND_INITIATE_URL,
  RAZORPAY_URL,
} from "../utility/Constant";
import Cookies from "universal-cookie/lib";

class BookingDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomList: props.location.state.results,
      taxRate: props.location.state.taxRate,
      totalPrice: 0,
      tax: 0,
      advance: 0,
      checkInDate: props.location.state.checkInDate,
      checkOutDate: props.location.state.checkOutDate,
      name: "",
      email: "",
      phone: "",
      hotelId: props.location.state.hotelId,
      bookInProgress: false,
      priceWithTax: 0,
    };
  }

  // fillUserDetails = () => {
  //   let jwtTokenCookie = new Cookies();
  //   let jwtToken = jwtTokenCookie.get("jwtToken");
  // };

  componentDidMount() {
    let total = 0;
    this.state.roomList.map((room) => {
      total += room.roomCount * room.roomPrice;
    });

    let taxAmount = (total * this.state.taxRate) / 100;
    let temp = total + taxAmount;
    let adv = (total + taxAmount) * 0.2;
    this.setState({
      totalPrice: total,
      tax: parseFloat(taxAmount).toFixed(2),
      advance: adv,
      priceWithTax: temp,
    });
    // this.fillUserDetails();
  }

  loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = RAZORPAY_URL;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  convertArrayToString = (roomList) => {
    let roomListString = "{";
    roomList.map((room) => {
      roomListString += "'" + room.roomType + "'" + ":" + room.roomCount + ",";
    });

    roomListString = roomListString.slice(0, -1);
    roomListString += "}";
    return roomListString;
  };
  paymentCompleteAndBooking = async (response) => {
    const paymentsData = {
      amount: this.state.advance * 100,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      status: "completed",
    };

    try {
      let jwtTokenCookie = new Cookies();
      let jwtToken = jwtTokenCookie.get("jwtToken");

      // Payment Successfull... Saving to Database
      var payment = await axios.post(PAYMENT_SUCCESSFUL_URL, paymentsData, {
        headers: {
          Authorization: jwtToken,
          // ? jwtToken
          // : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5kYW4ubWFqaUBwdWJsaWNpc3NhcGllbnQuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.raNRS4JuObBwnHS-xkgvcDEP44vA7VVLGEOfakC16Ps",
        },
      });
      //      console.log(payment);

      try {
        // Updating Bookings table
        let sum = 0;
        this.state.roomList.forEach((room) => {
          sum += parseInt(room.guestCount);
        });
        const bookingData = {
          paymentId: payment.data.paymentId,
          checkInDate: this.state.checkInDate,
          checkOutDate: this.state.checkOutDate,
          guestCount: sum,
          hotelId: this.state.hotelId,
          roomsBooked: this.convertArrayToString(this.state.roomList),
          status: "Completed",
        };
        //        console.log(bookingData);
        var bookingResponse = await axios.post(BOOKING_URL, bookingData, {
          headers: {
            Authorization: jwtToken,
            // ? jwtToken
            // : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5kYW4ubWFqaUBwdWJsaWNpc3NhcGllbnQuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.raNRS4JuObBwnHS-xkgvcDEP44vA7VVLGEOfakC16Ps",
          },
        });
        alert("Booking Successfull");
        this.props.history.push({
          pathname: "/bookings",
        });
      } catch (err) {
        var refund = await axios.post(
          PAYMENT_REFUND_INITIATE_URL + payment.data.paymentId
        );
        alert(
          "Booking has failed, refund is initiated payment id : " +
            payment.data.paymentId
        );
      }
    } catch (err) {
      //      console.log(err);
      alert(
        "Oops!!! Unable to complete booking. PAYMENT ID = " +
          response.razorpay_payment_id +
          "\nIf money deducted then contact Customer Care. Take a note of the PAYMENT ID"
      );
    }
    this.setState({ bookInProgress: false });
  };

  payment = async () => {
    this.setState({ bookInProgress: true });

    try {
      var razorpay_order = await axios.post(PAYMENT_INITIATE_URL, {
        amount: this.state.advance,
      });
    } catch (err) {
      //      console.log(err);
    }

    try {
      await this.loadRazorpayScript();
    } catch (err) {
      //      console.log(err);
      alert("Check your Internet Connection");
    }
    var options = {
      key: "rzp_test_gr1Fy5IgS0YJhh",
      amount: razorpay_order.data.amount,
      currency: "INR",
      name: "Hotel Management",
      description: "Test Transaction",
      order_id: razorpay_order.data.id,
      handler: this.paymentCompleteAndBooking,
      prefill: {
        name: this.state.name,
        email: this.state.email,
        contact: this.state.phone,
      },
      notes: {
        address: "BookHotel coorperate office, Gurgaon",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: () => {
          this.setState({ bookInProgress: false });
          alert("Payment Cancelled. Try Again");
        },
        confirm_close: true,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      //      console.log(response);
      this.setState({ bookInProgress: false });
      alert("Payment Failed");
    });
    rzp1.open();
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="column-details">
            {this.state.bookInProgress && (
              <div class="bookingDisable">
                <div class="bookingDisableMessage">Booking In Progress...</div>
              </div>
            )}
            <div class="booking_det_header">Booking details</div>
            <div class="column-details-inner">
              <table class="booking_details_prices_table">
                <tr>
                  <th>Check-in</th>
                  <th>Check-out</th>
                </tr>
                <tr>
                  <td>{this.state.checkInDate}</td>
                  <td>{this.state.checkOutDate}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Price</strong>
                  </td>
                  <td>Rs. {this.state.totalPrice}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Additional charges, GST</strong>
                  </td>
                  <td>Rs. {this.state.tax}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total Price</strong>
                  </td>
                  <td>
                    <strong>Rs. {this.state.priceWithTax}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Advance to pay </strong>
                  </td>
                  <td>
                    <strong>Rs. {this.state.advance}</strong>
                  </td>
                </tr>
              </table>
              <Button
                cssClassName="btn--publicis-success book-pay-btn"
                label="Pay and Book"
                handleClick={this.payment}
              ></Button>
            </div>
          </div>

          <div className="column-rooms">
            {this.state.roomList.map((room) => {
              return (
                <div>
                  <RoomDetails
                    roomType={room.roomType}
                    roomPrice={room.roomPrice}
                    maxPersons={room.maxPersons}
                    roomInclusions={room.roomInclusions}
                    roomCount={room.roomCount}
                    guestCount={room.guestCount}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default BookingDetails;
