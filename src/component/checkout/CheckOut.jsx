import React from "react";
import "../../css/checkin_checkout/checkin_checkout.css";
import axios from "axios";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import Cookies from "universal-cookie/lib";
import { Input } from "../utility/Input";
import Button from "../utility/Button";

const initialState = {
  totalBill: "",
  bills: [],
  errors: {},
  failureMsg: "",
  errMsg: "",
  isPaid: false,
};

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      bookingId: this.props.location.state.bookingId,
      totalAmount: 0.0,
      checkOutDate: new Date().toISOString().substr(0, 10),
      checkOutTime: (new Date().getHours() < 10 ? '0' : '') + new Date().getHours() + ":" +(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes(),
    };
  }

  handleChange = (event, field) => {
    this.setState({ failureMsg: "" });
    this.setState({ [field]: event.target.value });
  };

  paySubmit = (event) => {
    event.preventDefault();

    let object = {
      bookingId: this.state.bookingId,
      checkOutDate: this.state.checkOutDate,
      checkOutTime: this.state.checkOutTime,
      amountPaid: this.state.totalAmount,
    };

    // jwt token
    let jwtTokenCookie = new Cookies(); 
    axios
      .post(HOTEL_SERVICE_BASE_URL + "/checkout/add", object, {})
      .then((res) => {
        this.setState({ isPaid: true });
        this.setState({ totalAmount: 0.0 });
      })
      .catch((error) => {
        this.setState({ failureMsg: "Failed to update Checkout status !" });
      });
  };

  handleSubmit = async (event) => {
    this.setState({ bills: [] });
    this.setState({ totalAmount: 0.0 });
    event.preventDefault();
    let obj = {
      bookingId: this.state.bookingId,
    };

    let jwtTokenCookie = new Cookies();

    let URL =
      HOTEL_SERVICE_BASE_URL + "/bookings/" + obj.bookingId + "/bills";
    await axios
      .get(URL, {
        headers: {
          Authorization: jwtTokenCookie.get("jwtToken"),
        },
      })
      .then((res) => {
        
        if(res.data.length===0)
        {
          
          this.paySubmit(event);
          alert("Cutomer Checked Out")
          this.props.history.push({
            pathname: "/admin/bookings",
            state: {
              hotelid: this.props.location.state.hotelId,
            },
          });
        }
        else
        {
          this.setState({ bills: res.data });
        }
      })
      .catch((error) => {
        this.setState({ errMsg: "Network Error Try Again!" });
      });
  };

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
    return (
      <div className="--form-card-publicis">
        {/* <div className="checkin_checkout-main-container">
                    <h1 className="checkin_checkout-header">Check Out</h1> */}
        <div className="--form-card-publicis-header">Check Out</div>
        {/* <div className="checkin_checkout-sub-container"> */}
        <div className="--form-card-publicis-body">
          {/* <div className="group"> */}
          <div className="--form-publicis-group">
            <label className="--form-publicis-input">
              Booking Id : {this.state.bookingId}
            </label>
          </div>
          <div className="--form-publicis-group">
            {/* <input type="date" */}
            <Input
              type="date"
              className="--form-publicis-input"
              label="CheckOut Date *"
              id="checkOutDate"
              value={this.state.checkOutDate}
              onChange={(event) => this.handleChange(event, "checkOutDate")}
            />
            {/* <label htmlFor="checkOutDate">CheckOut Date </label> */}
            {this.state.errors["checkOutDate"] &&
              this.state.errors["checkOutDate"] !== "" && (
                <p className="error-name-admin">
                  {this.state.errors["checkOutDate"]}
                </p>
              )}
          </div>
          <div className="--form-publicis-group">
            <Input
              type="time"
              className="--form-publicis-input"
              label="CheckOut Time *"
              id="checkOutTime"
              value={this.state.checkOutTime}
              onChange={(event) => this.handleChange(event, "checkOutTime")}
            />
            {this.state.errors["checkOutTime"] &&
              this.state.errors["checkOutTime"] !== "" && (
                <p className="error-name-admin">
                  {this.state.errors["checkOutTime"]}
                </p>
              )}
          </div>
          {this.state.errMsg !== "" && (
            <p className="error-name-admin">{this.state.errMsg}</p>
          )}
          <Button
            cssClassName="btn--publicis-primary checks_button"
            label="Submit"
            handleClick={this.handleSubmit}
          ></Button>
          {/* <button type="submit" onClick={this.handleSubmit}>Submit</button> */}
          {/* </div> */}
        </div>
        {this.state.bills.length > 0 && (
          <div className="checkout-bills">
            <h1 className="checkin_checkout-bills-header">Bill</h1>
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
            {this.state.failureMsg !== "" && (
              <p className="checkin_checkout-warning">
                {this.state.failureMsg}
              </p>
            )}
            {!this.state.isPaid && (
              <button
                className="btn--publicis-success"
                type="submit"
                onClick={this.paySubmit}
              >
                Pay Bill
              </button>
            )}
            {this.state.isPaid && (
              <button
                type="submit"
                className="btn--publicis-success"
                onClick={() => {
                  this.props.history.push({
                    pathname: "/admin/invoice",
                    state: {
                      bookingId: this.props.location.state.bookingId,
                    },
                  });
                }}
              >
                Proceed
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default CheckOut;
