import React from "react";
import "../../css/checkin_checkout/checkin_checkout.css";
import axios from "axios";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import Cookies from "universal-cookie/lib";
class AllBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      totalAmount: 0.0,
    };
  }
  componentDidMount() {
    this.getAllBills();
  }
  getAllBills() {
    // this.setState({bills: []});
    this.setState({ totalAmount: 0.0 });
    // event.preventDefault();
    let obj = {
      bookingId: this.props.location.state.bookingId,
    };
    let jwtTokenCookie = new Cookies();
    let URL = HOTEL_SERVICE_BASE_URL + "/bookings/" + obj.bookingId + "/bills";
    // await
    axios
      .get(URL, {
        headers: {
          Authorization: jwtTokenCookie.get("jwtToken"),
        },
      })
      .then((res) => {
        //        console.dir(res.data);
        this.setState({ bills: res.data });
      })
      .catch((error) => {
        this.setState({ errMsg: "Network Error Try Again!" });
      });
  }
  renderAllBills() {
    this.state.totalAmount = 0.0;
    return this.state.bills.map((bill, index) => {
      this.state.totalAmount += parseFloat(bill.amount);
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{bill.service.name}</td>
          <td>{bill.price}</td>
          <td>{bill.quantity}</td>
          <td>{bill.discount}</td>
          <td>{bill.amount}</td>
        </tr>
      );
    });
  }
  render() {
    if (this.state.bills.length > 0) {
      return (
        <div className="checkin_checkout-supreme-container">
          {this.state.bills.length > 0 && (
            <div className="checkout-bills">
              <div className="checkin_checkout-bills-header">
                All Bills (Booking Id: {this.props.location.state.bookingId})
              </div>
              <table id="checkout-bills-table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Service Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderAllBills()}
                  <tr>
                    <td colSpan={5}>TOTAL</td>
                    <td>{this.state.totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="checkin_checkout-supreme-container">
          <div className="no-bills-booking">
            NO HOTEL SERVICE USED FOR THIS BOOKING
          </div>
        </div>
      );
    }
  }
}

export default AllBill;
